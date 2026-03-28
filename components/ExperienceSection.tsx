import { Mountain, Compass, Users, ShieldCheck } from "lucide-react";

const experiences = [
    {
        icon: Mountain,
        title: "Hidden Places",
        description: "Discover secret spots untouched by mass tourism",
        color: "#C9A96E"
    },
    {
        icon: Compass,
        title: "Guided Adventures",
        description: "Expert local guides for authentic experiences",
        color: "#C4704A"
    },
    {
        icon: Users,
        title: "Authentic Culture",
        description: "Immerse yourself in traditional Nepali life",
        color: "#6B8C6B"
    },
    {
        icon: ShieldCheck,
        title: "Safe Travel",
        description: "Your safety is our top priority",
        color: "#8C8480"
    }
];

export default function ExperienceSection() {
    return (
        <section className="py-32 px-4 max-w-7xl mx-auto bg-gradient-to-b from-[#f8fafc] via-[#f5f3ef] to-[#faf8f4] relative">
            {/* Smooth Wave Divider Top */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
                <svg className="relative block w-full h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#F8FAFC', stopOpacity: 1 }} />
                            <stop offset="50%" style={{ stopColor: '#F5F3EF', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#F8FAFC', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <path d="M0,0 C200,70 400,70 600,40 C800,10 1000,10 1200,40 L1200,0 L0,0 Z" fill="url(#waveGradient3)"></path>
                </svg>
            </div>

            {/* Subtle noise texture overlay */}
            <div className="absolute inset-0 opacity-[0.01] pointer-events-none" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
            }}></div>

            <div className="text-center mb-20 relative z-10">
                <div className="inline-flex items-center gap-3 text-gold text-[11px] font-bold tracking-[2.5px] uppercase mb-4">
                    <span className="w-6 h-[1.5px] bg-gold" />
                    Why Choose Us
                </div>
                <h2 className="text-5xl font-heading font-bold text-ink mb-4">Experience Nepal Like Never Before</h2>
                <p className="text-warmGray text-xl">Authentic adventures with local expertise</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {experiences.map((exp, index) => {
                    const IconComponent = exp.icon;
                    return (
                        <div
                            key={index}
                            className="group text-center p-8 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border border-border"
                        >
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${exp.color}15` }}>
                                <IconComponent className="w-8 h-8" style={{ color: exp.color }} />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-ink mb-3">{exp.title}</h3>
                            <p className="text-warmGray leading-relaxed">{exp.description}</p>
                        </div>
                    );
                })}
            </div>

            {/* Smooth Wave Divider Bottom */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                <svg className="relative block w-full h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="waveGradient4" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#FAF8F4', stopOpacity: 1 }} />
                            <stop offset="50%" style={{ stopColor: '#F5F3EF', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#FAF8F4', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <path d="M0,120 C200,50 400,50 600,80 C800,110 1000,110 1200,80 L1200,120 L0,120 Z" fill="url(#waveGradient4)"></path>
                </svg>
            </div>

            {/* Soft shadow for depth */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/3 to-transparent pointer-events-none"></div>
        </section>
    );
}
