import { NextResponse } from "next/server";
import pool from "@/app/lib/db";
import bcrypt from "bcryptjs";

async function createTables() {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role ENUM('admin','content_manager','event_manager','media_manager') DEFAULT 'admin',
      is_active TINYINT(1) DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS athletes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      athlete_id VARCHAR(20) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      state VARCHAR(100),
      city VARCHAR(100),
      category VARCHAR(10),
      position VARCHAR(100),
      status ENUM('Active','Inactive','Retired') DEFAULT 'Active',
      featured TINYINT(1) DEFAULT 0,
      achievements INT DEFAULT 0,
      bio TEXT,
      joined_date DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS events (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE,
      venue VARCHAR(255),
      city VARCHAR(100),
      registrations INT DEFAULT 0,
      status ENUM('Draft','Open','Published','Scheduled','Completed','Cancelled') DEFAULT 'Draft',
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS partners (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      logo_url VARCHAR(500),
      website VARCHAR(500),
      category ENUM('Title Sponsor','Official Partner','Supporting Partner','Media Partner') DEFAULT 'Official Partner',
      featured TINYINT(1) DEFAULT 0,
      status ENUM('Active','Inactive','Pending') DEFAULT 'Active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      subject VARCHAR(255),
      message TEXT NOT NULL,
      is_read TINYINT(1) DEFAULT 0,
      is_important TINYINT(1) DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS activity_logs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      type ENUM('edit','create','delete','publish','upload') DEFAULT 'edit',
      description VARCHAR(500) NOT NULL,
      actor_name VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(255),
      quote_text TEXT NOT NULL,
      avatar_url VARCHAR(500),
      rating TINYINT DEFAULT 5,
      status ENUM('pending','approved','rejected') DEFAULT 'pending',
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Migration: rename 'content' column to 'quote_text' if old schema exists
  try {
    const [cols] = await pool.execute(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'testimonials' AND COLUMN_NAME = 'content'`
    );
    if ((cols as unknown[]).length > 0) {
      await pool.execute(`ALTER TABLE testimonials CHANGE COLUMN content quote_text TEXT NOT NULL`);
    }
  } catch { /* ignore */ }

  // Migration: add missing columns to testimonials if they don't exist
  const testimonialCols = ['avatar_url VARCHAR(500)', 'rating TINYINT DEFAULT 5', 'sort_order INT DEFAULT 0'];
  for (const colDef of testimonialCols) {
    const colName = colDef.split(' ')[0];
    try {
      const [existing] = await pool.execute(
        `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'testimonials' AND COLUMN_NAME = ?`,
        [colName]
      );
      if ((existing as unknown[]).length === 0) {
        await pool.execute(`ALTER TABLE testimonials ADD COLUMN ${colDef}`);
      }
    } catch { /* ignore */ }
  }

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS homepage_sections (
      section_key VARCHAR(100) NOT NULL PRIMARY KEY,
      data LONGTEXT NOT NULL,
      is_enabled TINYINT(1) DEFAULT 1,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS committee_members (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      designation VARCHAR(255) NOT NULL,
      bio TEXT,
      image_url VARCHAR(500),
      sort_order INT DEFAULT 0,
      is_active TINYINT(1) DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS about_sections (
      section_key VARCHAR(100) NOT NULL PRIMARY KEY,
      data LONGTEXT NOT NULL,
      is_enabled TINYINT(1) DEFAULT 1,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Migration: add sort_order to partners if missing
  try {
    const [pc] = await pool.execute(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='partners' AND COLUMN_NAME='sort_order'`
    );
    if ((pc as unknown[]).length === 0) {
      await pool.execute(`ALTER TABLE partners ADD COLUMN sort_order INT DEFAULT 0`);
    }
  } catch { /* ignore */ }

  // Migration: add logo_url to partners if missing
  try {
    const [pl] = await pool.execute(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='partners' AND COLUMN_NAME='logo_url'`
    );
    if ((pl as unknown[]).length === 0) {
      await pool.execute(`ALTER TABLE partners ADD COLUMN logo_url VARCHAR(500)`);
    }
  } catch { /* ignore */ }

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS news_articles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(500) NOT NULL,
      excerpt TEXT,
      content TEXT,
      image_url VARCHAR(1000),
      category VARCHAR(100) DEFAULT 'General',
      article_url VARCHAR(500),
      published_date VARCHAR(50),
      is_featured TINYINT(1) DEFAULT 0,
      status ENUM('Published','Draft') DEFAULT 'Draft',
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
}

export async function GET() {
  try {
    await createTables();

    const results: string[] = [];

    // --- Users ---
    const [uRows] = await pool.execute("SELECT id FROM users WHERE email = ?", ["admin@wheelchair.com"]);
    if ((uRows as unknown[]).length === 0) {
      const hash = await bcrypt.hash("Admin@123", 12);
      await pool.execute(
        "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
        ["Admin", "admin@wheelchair.com", hash, "admin"]
      );
      results.push("Admin user created");
    }

    // --- Athletes ---
    const [aRows] = await pool.execute("SELECT id FROM athletes LIMIT 1");
    if ((aRows as unknown[]).length === 0) {
      const athletes = [
        ["ATH-001", "Arjun Singh", "Punjab", "Amritsar", "1.0", "Low Pointer", "Active", 1, 8, "National team captain and veteran player.", "2022-01-15"],
        ["ATH-002", "Vikram Reddy", "Telangana", "Hyderabad", "2.5", "Mid Pointer", "Active", 0, 5, "Rising star from Telangana.", "2022-03-10"],
        ["ATH-003", "Rohit Mehta", "Maharashtra", "Pune", "3.0", "High Pointer", "Active", 1, 12, "Two-time national champion.", "2021-08-20"],
        ["ATH-004", "Karan Joshi", "Gujarat", "Ahmedabad", "1.5", "Low Pointer", "Active", 0, 3, "Young talent from Gujarat.", "2023-11-05"],
        ["ATH-005", "Suresh Naidu", "Andhra Pradesh", "Visakhapatnam", "2.0", "Mid Pointer", "Inactive", 0, 2, "On medical break.", "2024-02-18"],
        ["ATH-006", "Manish Gupta", "Delhi", "New Delhi", "3.5", "High Pointer", "Active", 1, 9, "Delhi's top scorer.", "2020-07-12"],
        ["ATH-007", "Pranav Iyer", "Tamil Nadu", "Chennai", "2.5", "Mid Pointer", "Retired", 0, 14, "Legendary player, now a coach.", "2018-03-01"],
        ["ATH-008", "Sandeep Kaur", "Haryana", "Gurugram", "1.0", "Low Pointer", "Active", 0, 4, "First female player from Haryana.", "2023-09-22"],
      ];
      for (const a of athletes) {
        await pool.execute(
          "INSERT INTO athletes (athlete_id,name,state,city,category,position,status,featured,achievements,bio,joined_date) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
          a
        );
      }
      results.push("8 athletes seeded");
    }

    // --- Events ---
    const [evRows] = await pool.execute("SELECT id FROM events LIMIT 1");
    if ((evRows as unknown[]).length === 0) {
      const events = [
        ["National Championship 2026", "2026-07-15", "2026-07-20", "Indira Gandhi Indoor Stadium", "New Delhi", 124, "Published", "Annual national wheelchair rugby championship."],
        ["Asian Para Games Qualifiers", "2026-08-05", "2026-08-10", "NSCI Dome", "Mumbai", 86, "Open", "Qualifier tournament for Asian Para Games."],
        ["State Selection Trials", "2026-09-02", "2026-09-04", "Kanteerava Indoor Stadium", "Bengaluru", 42, "Draft", "State-level player selection trials."],
        ["Friendly vs Sri Lanka", "2026-10-12", "2026-10-12", "Jawaharlal Nehru Stadium", "Chennai", 18, "Scheduled", "International friendly match against Sri Lanka."],
      ];
      for (const e of events) {
        await pool.execute(
          "INSERT INTO events (title,start_date,end_date,venue,city,registrations,status,description) VALUES (?,?,?,?,?,?,?,?)",
          e
        );
      }
      results.push("4 events seeded");
    }

    // --- Partners ---
    const [pRows] = await pool.execute("SELECT id FROM partners LIMIT 1");
    if ((pRows as unknown[]).length === 0) {
      const partners = [
        ["TATA Motors", "https://tatamotors.com", "Title Sponsor", 1, "Active"],
        ["ICICI Bank", "https://icicibank.com", "Official Partner", 1, "Active"],
        ["Sports Authority of India", "https://sai.gov.in", "Official Partner", 0, "Active"],
        ["Khelo India", "https://kheloindia.gov.in", "Supporting Partner", 0, "Active"],
        ["Times of India", "https://timesofindia.com", "Media Partner", 0, "Active"],
        ["Adani Group", "https://adani.com", "Supporting Partner", 0, "Pending"],
      ];
      for (const p of partners) {
        await pool.execute(
          "INSERT INTO partners (name,website,category,featured,status) VALUES (?,?,?,?,?)",
          p
        );
      }
      results.push("6 partners seeded");
    }

    // --- Contact Messages ---
    const [cRows] = await pool.execute("SELECT id FROM contact_messages LIMIT 1");
    if ((cRows as unknown[]).length === 0) {
      const msgs = [
        ["Priya Sharma", "priya@example.com", "+91 98765 43210", "Volunteer enquiry", "Hi, I'd love to volunteer at the upcoming Nationals. Please share details on how I can sign up.", 0, 1],
        ["Rahul Mehta", "rahul@example.com", "+91 97654 32109", "Sponsorship interest", "Our company is interested in becoming an official partner for the Asian Games qualifier. Can we connect?", 0, 1],
        ["Anita Rao", "anita@example.com", "+91 96543 21098", "Athlete registration", "How do I register my brother as a wheelchair rugby athlete? He's 22 and recently classified.", 1, 0],
        ["Karan Kapoor", "karan@example.com", "+91 95432 10987", "Press accreditation", "I'm a sports journalist. Requesting press accreditation for the upcoming championship.", 1, 0],
        ["Deepak Joshi", "deepak@example.com", "+91 94321 09876", "General feedback", "Thank you for the inspiring work. Watched the highlights — keep going!", 1, 0],
      ];
      for (const m of msgs) {
        await pool.execute(
          "INSERT INTO contact_messages (name,email,phone,subject,message,is_read,is_important) VALUES (?,?,?,?,?,?,?)",
          m
        );
      }
      results.push("5 contact messages seeded");
    }

    // --- Activity Logs ---
    const [lRows] = await pool.execute("SELECT id FROM activity_logs LIMIT 1");
    if ((lRows as unknown[]).length === 0) {
      const logs = [
        ["edit", "Hero section updated on Home page", "Admin"],
        ["create", "New athlete profile: Arjun Singh added", "Admin"],
        ["publish", "Event 'National Championship 2026' published", "Admin"],
        ["upload", "12 new images uploaded to gallery", "Admin"],
        ["edit", "Selection Policy page content revised", "Admin"],
        ["publish", "Sponsor 'TATA Motors' activated", "Admin"],
      ];
      for (const l of logs) {
        await pool.execute(
          "INSERT INTO activity_logs (type, description, actor_name) VALUES (?, ?, ?)",
          l
        );
      }
      results.push("6 activity logs seeded");
    }

    // --- Testimonials ---
    const [tRows] = await pool.execute("SELECT id FROM testimonials LIMIT 1");
    if ((tRows as unknown[]).length === 0) {
      const testimonials = [
        ["Arjun Mehta", "National Team Athlete", "Wheelchair rugby changed my life. WRFI gave me a platform to compete, to dream big, and to prove that disability is not inability.", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80", 5, "approved", 1],
        ["Kavita Joshi", "Women's Team Captain", "Being part of WRFI has been the most rewarding experience. The community, the support, the spirit — it's like a second family.", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80", 5, "approved", 2],
        ["Deepak Verma", "State Coach, Maharashtra", "I started as a volunteer and now I coach 30 athletes. WRFI's mission of inclusion is real — you see it in every training session.", "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80", 5, "approved", 3],
        ["Neha Verma", "Athlete, Maharashtra", "WRFI has completely changed my life. The support and coaching I've received here is world-class.", null, 5, "pending", 4],
        ["Ravi Shankar", "Sports Journalist", "Witnessing the growth of wheelchair rugby in India has been phenomenal. WRFI is doing outstanding work.", null, 5, "approved", 5],
      ];
      for (const t of testimonials) {
        await pool.execute(
          "INSERT INTO testimonials (name, role, quote_text, avatar_url, rating, status, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)",
          t
        );
      }
      results.push("5 testimonials seeded");
    }

    // --- Homepage Sections (CMS) ---
    const [hRows] = await pool.execute("SELECT section_key FROM homepage_sections LIMIT 1");
    if ((hRows as unknown[]).length === 0) {
      const sections: [string, string, number][] = [
        ["hero", JSON.stringify({
          slides: [
            { image: "/images/home.jpg", alt: "WRFI Team Photo" },
            { image: "/images/slider2.png", alt: "Wheelchair rugby players in action" },
            { image: "/images/slider3.png", alt: "Wheelchair rugby match" }
          ],
          title: "Wheelchair Rugby Federation of India",
          tagline: '"Sports With Different Ability"',
          btn_primary_text: "Explore Events",
          btn_primary_url: "#events",
          btn_secondary_text: "Join Us",
          btn_secondary_url: "#contact",
          athletes: [
            { name: "Abhinav Bindra", image: "/images/s1.png", medals: [{ color: "bg-yellow-400", label: "G" }] },
            { name: "Yogeshwar Dutt", image: "/images/s2.png", medals: [{ color: "bg-orange-500", label: "B" }] },
            { name: "Manu Bhaker", image: "/images/s3.png", medals: [{ color: "bg-orange-500", label: "B" }, { color: "bg-orange-500", label: "B" }] }
          ]
        }), 1],
        ["stats", JSON.stringify([
          { icon: "Users", value: 220, suffix: "+", label: "Players" },
          { icon: "Calendar", value: 15, suffix: "+", label: "Events" },
          { icon: "MapPin", value: 10, suffix: "+", label: "States" },
          { icon: "UserCheck", value: 40, suffix: "+", label: "Women Athletes" }
        ]), 1],
        ["announcement", JSON.stringify({
          badge: "Historic Achievement",
          title: "The Indian Wheelchair Rugby Team is heading to Japan for the 2026",
          highlight: "Para Asian Games! 🇮🇳",
          description: "A proud moment for Indian wheelchair rugby as our athletes qualify to represent the nation on the international stage.",
          btn_text: "View Events",
          btn_url: "/events",
          start_date: "2025-01-01",
          end_date: "2026-12-31"
        }), 1],
        ["about", JSON.stringify({
          video_url: "https://www.youtube.com/embed/vZL79Cq20eo?autoplay=1&mute=1&loop=1&playlist=vZL79Cq20eo&controls=1&modestbranding=1&rel=0",
          since_year: "2009",
          section_badge: "About WRFI",
          title: "Empowering Athletes,",
          title_gradient: "Transforming Lives",
          body1: "The Wheelchair Rugby Federation of India (WRFI) is the official governing body for wheelchair rugby in the country. Affiliated with the International Wheelchair Rugby Federation (IWRF), WRFI has been championing inclusive sports since wheelchair rugby was introduced in India in 2009.",
          body2: "Our mission is to develop, promote, and make wheelchair rugby a mainstream competitive sport across India — empowering athletes with disabilities, building world-class teams, and representing India on the global stage.",
          btn1_text: "Our Journey",
          btn1_url: "#history",
          btn2_text: "Our Mission",
          btn2_url: "#vision"
        }), 1],
        ["vmv", JSON.stringify([
          { type: "Vision", title: "Our Vision", description: "To make India a leading force in international wheelchair rugby, ensuring every athlete with a disability has the opportunity to compete, excel, and inspire." },
          { type: "Motto", title: "Our Motto", description: "\"Sports With Different Ability\" — We believe that ability is not defined by physicality, but by determination, courage, and the will to push beyond limits." },
          { type: "Values", title: "Our Values", description: "Inclusion, integrity, and excellence. We stand for equal opportunity, fair play, athlete welfare, and the transformative power of sport in building a better society." }
        ]), 1],
        ["timeline", JSON.stringify([
          { year: "1977", title: "Sport Invented", description: "Wheelchair rugby was invented in Winnipeg, Canada by athletes looking for an alternative to wheelchair basketball that would allow quadriplegics to compete equally.", color: "bg-saffron" },
          { year: "1994", title: "Paralympic Recognition", description: "Wheelchair rugby was officially recognized as a Paralympic sport and featured as a demonstration event at the 1996 Atlanta Paralympics.", color: "bg-blue-accent" },
          { year: "2009", title: "Introduced in India", description: "Wheelchair rugby was introduced in India, marking the beginning of a new chapter in Indian para-sports. The first demonstrations and training sessions began.", color: "bg-india-green" },
          { year: "2019", title: "WRFI Established", description: "The Wheelchair Rugby Federation of India was officially formed, uniting athletes, coaches, and supporters under a single governing body.", color: "bg-saffron" },
          { year: "2024", title: "International Debut", description: "Team India competed in its first international wheelchair rugby tournament, putting the country on the global wheelchair rugby map.", color: "bg-gold" }
        ]), 1],
        ["contact", JSON.stringify({
          email: "info@wrfi.org",
          phone: "+91 98765 43210",
          address: "WRFI Headquarters, Sector 18, Noida, Uttar Pradesh — 201301, India",
          maps_url: "",
          facebook: "https://facebook.com/wrfi",
          instagram: "https://instagram.com/wrfi",
          twitter: "https://x.com/wrfi",
          youtube: "https://youtube.com/@wrfi"
        }), 1],
        ["sections_visibility", JSON.stringify({
          hero: true, announcement: true, about: true, stats: true,
          events: true, vmv: true, timeline: true, gallery: true,
          partners: true, contact: true, testimonials: true
        }), 1],
      ];
      for (const [key, data, enabled] of sections) {
        await pool.execute(
          "INSERT IGNORE INTO homepage_sections (section_key, data, is_enabled) VALUES (?, ?, ?)",
          [key, data, enabled]
        );
      }
      results.push("8 homepage sections seeded");
    }

    // --- Committee Members ---
    const [cmRows] = await pool.execute("SELECT id FROM committee_members LIMIT 1");
    if ((cmRows as unknown[]).length === 0) {
      const members = [
        ["Prabal Pratap Singh (Raghu Bhaiya)", "Mentor", "Guiding force behind WRFI's strategic vision and athlete development programs.", "/images/o.jpeg", 1, 1],
        ["Rajnish Jaiswal", "Patron", "Championing wheelchair rugby and supporting the federation's growth across India.", "/images/on.jpeg", 2, 1],
        ["Dr Vivek Parihar", "President and Director", "Leading WRFI's mission to make wheelchair rugby a mainstream sport in India.", "/images/image.png", 3, 1],
        ["Dr Pardeep Kumar Mahajan", "Vice President", "Driving operational excellence and national program development.", "/images/img.png", 4, 1],
        ["Mohammad Shahid", "Sports Director", "Overseeing athlete training, coaching programs, and competitive excellence.", "/images/imag.png", 5, 1],
        ["Swati Singh", "Treasurer", "Managing financial operations and ensuring sustainable growth of the federation.", "/images/imgg.png", 6, 1],
      ];
      for (const m of members) {
        await pool.execute(
          "INSERT INTO committee_members (name, designation, bio, image_url, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?)",
          m
        );
      }
      results.push("6 committee members seeded");
    }

    // --- About Sections ---
    const [asRows] = await pool.execute("SELECT section_key FROM about_sections LIMIT 1");
    if ((asRows as unknown[]).length === 0) {
      const aboutSections: [string, string, number][] = [
        ["about_hero", JSON.stringify({
          badge: "Who We Are",
          title: "About",
          title_gradient: "WRFI",
          subtitle: "Championing wheelchair rugby and inclusive sports across India since 2009."
        }), 1],
        ["about_intro", JSON.stringify({
          badge: "About Us",
          title: "Wheelchair Rugby Federation of India",
          image_url: "/images/abou.png",
          image_alt: "WRFI team during a wheelchair rugby match",
          body1: "The Wheelchair Rugby Federation of India (WRFI) is the official national governing body for wheelchair rugby in India. Affiliated with the International Wheelchair Rugby Federation (IWRF), WRFI is dedicated to developing, promoting, and organizing wheelchair rugby at all levels.",
          body2: "We work tirelessly to create opportunities for athletes with physical disabilities, ensuring they have access to world-class coaching, equipment, and competitive platforms to showcase their talent and determination."
        }), 1],
        ["history_recognition", JSON.stringify({
          badge: "The Sport",
          title: "History & Recognition of",
          title_gradient: "Wheelchair Rugby",
          body1: "Wheelchair rugby, originally known as \"Murderball\", was invented in 1977 in Winnipeg, Canada by a group of quadriplegic athletes who were looking for a sport that would allow players with reduced arm and hand function to compete on an equal basis.",
          body2: "The sport was first demonstrated at the 1996 Atlanta Paralympics and became a full medal sport at the 2000 Sydney Paralympics. Today, it is one of the most exciting and physically demanding Paralympic sports, played in over 40 countries worldwide.",
          body3: "Wheelchair rugby is governed internationally by the International Wheelchair Rugby Federation (IWRF), which was established in 1993 and recognized by the International Paralympic Committee (IPC).",
          timeline: [
            { year: "1977", text: "Invented in Winnipeg, Canada by quadriplegic athletes" },
            { year: "1993", text: "IWRF established as the international governing body" },
            { year: "1996", text: "Demonstration sport at the Atlanta Paralympics" },
            { year: "2000", text: "Full medal sport at the Sydney Paralympics" },
            { year: "40+", text: "Countries actively playing wheelchair rugby today" }
          ]
        }), 1],
        ["journey_india", JSON.stringify({
          badge: "India's Story",
          title: "The Journey in",
          title_gradient: "India",
          body1: "Wheelchair rugby was introduced in India in 2009, marking the beginning of a new era in Indian para-sports. The sport quickly gained traction among athletes with quadriplegia and other physical disabilities across the country.",
          body2: "The Wheelchair Rugby Federation of India (WRFI) was officially established to provide a structured governing body for the sport. Since its formation, WRFI has organized national championships, grassroots training camps across 15+ states, and has been instrumental in sending Team India to international competitions.",
          body3: "From a handful of players in 2009 to a growing community of 220+ athletes across the nation, the journey of wheelchair rugby in India is a testament to the resilience and spirit of Indian para-athletes.",
          image_url: "/images/abb.jpg",
          image_alt: "Wheelchair rugby players competing in India",
          stat_number: "220+",
          stat_label: "Athletes across India"
        }), 1],
        ["our_aim", JSON.stringify({
          badge: "Our Purpose",
          title: "Our",
          title_gradient: "Aim",
          subtitle: "WRFI is driven by a singular vision — to make wheelchair rugby a mainstream sport in India and empower every athlete with a disability.",
          cta_text: "Join the Movement",
          cta_url: "/contact",
          cards: [
            { icon: "Target", title: "Develop the Sport", description: "Build a robust infrastructure for wheelchair rugby across all states of India, from grassroots to elite level.", color: "from-saffron to-orange-500" },
            { icon: "Users", title: "Empower Athletes", description: "Provide world-class coaching, equipment, and financial support to athletes with disabilities nationwide.", color: "from-blue-accent to-blue-600" },
            { icon: "Globe", title: "International Excellence", description: "Prepare and send competitive Indian teams to Paralympic Games, World Championships, and continental events.", color: "from-india-green to-emerald-500" },
            { icon: "Flag", title: "Inclusive Society", description: "Use sport as a vehicle for social change, breaking barriers and promoting inclusion in every community.", color: "from-gold to-amber-500" }
          ]
        }), 1],
        ["committee_page", JSON.stringify({
          badge: "Our Leadership",
          title: "Meet Our",
          title_gradient: "Team",
          subtitle: "Dedicated leaders driving the growth of wheelchair rugby across India and empowering athletes with disabilities.",
          cta_title: "Join Our Mission",
          cta_subtitle: "Together, we're building a stronger, more inclusive future for wheelchair rugby in India.",
          cta_btn_text: "Get Involved",
          cta_btn_url: "/contact"
        }), 1],
        ["selection_hero", JSON.stringify({
          badge: "Transparent & Merit-Based",
          title: "Selection",
          title_gradient: "Policy",
          subtitle: "Our commitment to excellence through fair, transparent, and merit-based athlete selection for Indian wheelchair rugby teams."
        }), 1],
        ["selection_criteria", JSON.stringify({
          badge: "Core Principles",
          title: "Selection",
          title_gradient: "Criteria",
          items: [
            { icon: "Trophy", title: "Performance Excellence", description: "Athletes are evaluated based on competitive performance, skill proficiency, and consistency in national and international tournaments." },
            { icon: "Users", title: "Team Compatibility", description: "Ability to work cohesively within team dynamics, demonstrate sportsmanship, and contribute to collective team success." },
            { icon: "Target", title: "Classification Standards", description: "Compliance with IWRF classification system and eligibility criteria for wheelchair rugby competition." },
            { icon: "Award", title: "Training Commitment", description: "Regular participation in national training camps, adherence to fitness standards, and dedication to continuous improvement." }
          ]
        }), 1],
        ["selection_process", JSON.stringify({
          badge: "Step by Step",
          title: "Selection",
          title_gradient: "Process",
          steps: [
            { step: "1", title: "Athlete Registration", description: "Athletes register through official WRFI channels and submit required documentation including medical clearance and classification certificates." },
            { step: "2", title: "Performance Assessment", description: "Evaluation during national championships, training camps, and selection trials by certified coaches and technical committee." },
            { step: "3", title: "Technical Review", description: "Selection committee reviews performance data, coach recommendations, and athlete profiles against established criteria." },
            { step: "4", title: "Final Selection", description: "Transparent announcement of selected athletes with feedback provided to all participants for continuous development." }
          ]
        }), 1],
        ["eligibility", JSON.stringify({
          badge: "Essential Requirements",
          title: "Eligibility",
          title_gradient: "Criteria",
          requirements: [
            "Indian citizenship with valid proof of identity",
            "Valid IWRF classification certificate",
            "Medical fitness clearance from authorized physician",
            "Minimum age requirement: 16 years for junior teams, 18 years for senior teams",
            "Active membership with WRFI-affiliated state association",
            "Adherence to WADA anti-doping regulations",
            "Participation in mandatory national training camps",
            "Clean disciplinary record with no pending sanctions"
          ],
          important_note: "Selection decisions are final and made in the best interest of team performance and athlete development. All athletes receive constructive feedback to support their continuous growth in the sport."
        }), 1],
        ["selection_cta", JSON.stringify({
          title: "Ready to Represent India?",
          subtitle: "Join our national training programs and work towards selection for Team India in wheelchair rugby.",
          btn1_text: "Contact Us",
          btn1_url: "/contact",
          btn2_text: "View Events",
          btn2_url: "/events"
        }), 1],
        ["partners_page", JSON.stringify({
          badge: "Our Supporters",
          title: "Partners &",
          title_gradient: "Sponsors",
          subtitle: "Together with our valued partners, we champion wheelchair rugby and inclusive sports across India.",
          intro_badge: "Proudly Supported By",
          intro_title: "THE OFFICIAL PARTNERS",
          intro_description: "We are grateful to our sponsors and partners whose generous support helps us grow wheelchair rugby across the nation and empower athletes with disabilities.",
          cta_badge: "Partner With Us",
          cta_title: "Become an Official Partner",
          cta_description: "Join our growing family of partners and help us build a more inclusive sporting culture in India. Your support directly impacts the lives of wheelchair rugby athletes nationwide.",
          cta_btn1_text: "Get in Touch",
          cta_btn1_url: "/contact",
          cta_btn2_text: "Learn About WRFI",
          cta_btn2_url: "/about"
        }), 1],
      ];
      for (const [key, data, enabled] of aboutSections) {
        await pool.execute(
          "INSERT IGNORE INTO about_sections (section_key, data, is_enabled) VALUES (?, ?, ?)",
          [key, data, enabled]
        );
      }
      results.push("12 about sections seeded");
    }

    // --- News Articles ---
    const [naRows] = await pool.execute("SELECT id FROM news_articles LIMIT 1");
    if ((naRows as unknown[]).length === 0) {
      const articles = [
        ["WRFI National Championship 2026 — Registrations Now Open", "The flagship national wheelchair rugby championship returns this August. Teams from 20+ states expected to compete in New Delhi.", "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=800&q=80", "Championship", "May 10, 2026", 1, "Published", 1],
        ["Team India Secures Historic Bronze At Asia-Oceania Qualifiers", "A historic moment as India finishes third at the Asia-Oceania Championship, marking the best-ever international result.", "https://images.unsplash.com/photo-1569517282132-25d22f4573e6?auto=format&fit=crop&w=800&q=80", "International", "April 28, 2026", 1, "Published", 2],
        ["Grassroots Coaching Camp Reaches 5 New States", "WRFI expands its coaching program to Assam, Jharkhand, Odisha, Chhattisgarh, and Himachal Pradesh, training 120 new players.", "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=600&q=80", "Development", "April 22, 2026", 0, "Published", 3],
        ["WRFI Signs Equipment Partnership With Global Sports Brand", "A landmark deal ensures state-of-the-art rugby wheelchairs and gear for athletes across all national programs.", "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=600&q=80", "Partnership", "April 15, 2026", 0, "Published", 4],
        ["From Rehab To Rugby: Arjun Mehta's Inspiring Journey", "National team athlete Arjun Mehta shares his journey from injury recovery to representing India on the global stage.", "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80", "Athlete Spotlight", "April 8, 2026", 0, "Published", 5],
        ["Women's Wheelchair Rugby Program Launches In 8 States", "WRFI launches a dedicated women's development program aiming to field India's first women's national team by 2027.", "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=600&q=80", "Women In Sport", "March 30, 2026", 0, "Published", 6],
        ["Southern Regional Qualifiers Set For June In Bengaluru", "Karnataka, Tamil Nadu, Kerala, Telangana, and Andhra Pradesh teams to compete for national championship berths.", "https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&w=600&q=80", "Event", "March 22, 2026", 0, "Published", 7],
        ["WRFI Athletes Receive National Sports Awards Recognition", "Three wheelchair rugby athletes honored with national awards for their outstanding contribution to para-sports in India.", "https://images.unsplash.com/photo-1461896836934-bd45ba8a0ea6?auto=format&fit=crop&w=600&q=80", "Achievement", "March 15, 2026", 0, "Published", 8],
        ["International Coaching Workshop Held In Mumbai", "IWRF-certified coaches from Australia and Canada conduct intensive training workshop for 40 Indian coaches.", "https://images.unsplash.com/photo-1519766304817-4f37bda5a4ea?auto=format&fit=crop&w=600&q=80", "Training", "March 8, 2026", 0, "Draft", 9],
      ];
      for (const [title, excerpt, image_url, category, published_date, is_featured, status, sort_order] of articles) {
        await pool.execute(
          "INSERT INTO news_articles (title, excerpt, image_url, category, published_date, is_featured, status, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [title, excerpt, image_url, category, published_date, is_featured, status, sort_order]
        );
      }
      results.push("9 news articles seeded");
    }

    // --- News page sections (reuse about_sections keys) ---
    const newsSectionKeys = ["news_hero", "news_newsletter", "news_categories"];
    for (const key of newsSectionKeys) {
      const [nk] = await pool.execute("SELECT section_key FROM about_sections WHERE section_key = ?", [key]);
      if ((nk as unknown[]).length === 0) {
        const data = key === "news_hero"
          ? JSON.stringify({ badge: "Stay Informed", title: "Latest", title_gradient: "News", subtitle: "Updates, announcements, and inspiring stories from the world of wheelchair rugby in India." })
          : key === "news_categories"
          ? JSON.stringify([
              { name: "All News", color: "saffron", isDefault: true },
              { name: "Championship", color: "saffron", isDefault: false },
              { name: "International", color: "blue", isDefault: false },
              { name: "Development", color: "green", isDefault: false },
              { name: "Partnership", color: "gold", isDefault: false },
              { name: "Athlete Spotlight", color: "purple", isDefault: false },
              { name: "Women In Sport", color: "pink", isDefault: false },
              { name: "Event", color: "cyan", isDefault: false },
              { name: "Achievement", color: "emerald", isDefault: false },
            ])
          : JSON.stringify({ title: "Never Miss an Update", subtitle: "Subscribe to our newsletter for the latest news, events, and stories delivered to your inbox.", btn_text: "Subscribe", input_placeholder: "Your email address" });
        await pool.execute("INSERT INTO about_sections (section_key, data, is_enabled) VALUES (?, ?, 1)", [key, data]);
      }
    }
    results.push("News page sections ensured");

    return NextResponse.json({
      success: true,
      message: results.length > 0 ? results.join("; ") : "All data already seeded — no changes.",
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Seed error:", msg);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
