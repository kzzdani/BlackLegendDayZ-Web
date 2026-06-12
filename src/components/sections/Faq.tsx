"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Container, Heading, SectionLabel } from "@/components/ui";
import { cn } from "@/lib/utils";

export function Faq() {
  const t = useTranslations("faq");
  const faqs = t.raw("items") as { q: string; a: string }[];
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="relative py-24 sm:py-32">
      <Container className="max-w-3xl">
        <div className="text-center">
          <SectionLabel>
            <span className="mx-auto">{t("eyebrow")}</span>
          </SectionLabel>
          <Heading className="mt-5">
            {t("title1")} <span className="text-fire">{t("title2")}</span>
          </Heading>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={cn(
                  "overflow-hidden border bg-ash-900 transition-colors",
                  isOpen ? "border-ember/40" : "border-ash-700",
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center gap-4 px-6 py-5 text-left transition-colors hover:bg-ash-850"
                  aria-expanded={isOpen}
                >
                  <h3 className="flex-1 font-display text-lg font-bold uppercase tracking-wide text-bone sm:text-xl">
                    {f.q}
                  </h3>
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center border text-lg transition-all duration-300",
                      isOpen
                        ? "rotate-45 border-ember/50 text-ember"
                        : "border-ash-600 text-smoke",
                    )}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="border-t border-ash-700 px-6 py-5 text-sm leading-relaxed text-smoke">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
