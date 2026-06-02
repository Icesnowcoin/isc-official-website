/*
 * Design: Quantum Ice — Community section
 * Call-to-action for joining the ISC community with video
 */
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  MessageCircle,
  Gift,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ASSETS, LINKS } from "@/lib/assets";

export default function CommunitySection() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {});
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    setHasInteracted(true);
  };

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true));
    } else {
      video.pause();
      setIsPlaying(false);
    }
    setHasInteracted(true);
  };

  const communityFeatures = [
    {
      icon: <Users className="w-6 h-6" />,
      title: t("community.feature1") || "全球社区",
      desc: t("community.feature1Desc") || "连接全球 ISC 爱好者",
      link: LINKS.community,
      isClickable: true,
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: t("community.feature2") || "实时讨论",
      desc: t("community.feature2Desc") || "参与项目讨论和决策",
      link: LINKS.telegram,
      isClickable: true,
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: t("community.feature3") || "社区治理",
      desc:
        t("community.feature3Desc") || "参与 Snapshot 投票，决定 ISC 的未来",
      link: "https://snapshot.org/#/s:icesnowcoin.eth",
      isClickable: true,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="community"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ice-blue/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-ice-blue/10 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              color: "oklch(0.90 0.03 220)",
            }}
          >
            {t("video.title")}
          </h2>
          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-body)",
              color: "oklch(0.70 0.02 220)",
            }}
          >
            {t("video.subtitle")}
          </p>
          <div className="mt-4 mx-auto h-[1px] w-24 bg-gradient-to-r from-transparent via-ice-blue to-transparent" />
        </motion.div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden border border-[oklch(0.75_0.12_220/0.2)] border-glow mb-16"
        >
          <div className="relative aspect-video bg-[oklch(0.08_0.02_250)]">
            <video
              ref={videoRef}
              src={ASSETS.communityVideo}
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
              onClick={handlePlay}
            />

            {/* Play overlay (shown when not playing and not yet interacted) */}
            {!isPlaying && !hasInteracted && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-[oklch(0.08_0.02_250/0.5)] cursor-pointer"
                onClick={handlePlay}
              >
                <div className="w-16 h-16 rounded-full bg-[oklch(0.75_0.12_220/0.2)] backdrop-blur-sm flex items-center justify-center border border-[oklch(0.75_0.12_220/0.4)]">
                  <Play className="w-7 h-7 text-ice-blue ml-1" />
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={toggleMute}
                className="p-2 rounded-lg bg-[oklch(0.10_0.02_250/0.7)] backdrop-blur-sm border border-[oklch(0.75_0.12_220/0.2)] hover:border-[oklch(0.75_0.12_220/0.4)] transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-ice-blue" />
                ) : (
                  <Volume2 className="w-4 h-4 text-ice-blue" />
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="grid sm:grid-cols-3 gap-6"
        >
          {communityFeatures.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              {feature.isClickable && feature.link ? (
                <a
                  href={feature.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card rounded-xl p-6 text-center border-glow-hover transition-all duration-300 cursor-pointer hover:border-ice-blue hover:bg-[oklch(0.75_0.12_220/0.05)] block h-full"
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: "oklch(0.75 0.12 220 / 0.1)" }}
                  >
                    <div style={{ color: "oklch(0.75 0.12 220)" }}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "oklch(0.88 0.03 220)",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "oklch(0.65 0.02 220)",
                    }}
                  >
                    {feature.desc}
                  </p>
                </a>
              ) : (
                <div className="glass-card rounded-xl p-6 text-center border-glow-hover transition-all duration-300">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: "oklch(0.75 0.12 220 / 0.1)" }}
                  >
                    <div style={{ color: "oklch(0.75 0.12 220)" }}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "oklch(0.88 0.03 220)",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "oklch(0.65 0.02 220)",
                    }}
                  >
                    {feature.desc}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
