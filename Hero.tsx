import {
  BookOpen,
  Building2,
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  ListChecks,
  UsersRound,
} from "lucide-react";

type Audience = "bendrija" | "bendruomene";

export default function Hero() {
  const chooseAudience = (audience: Audience) => {
    window.dispatchEvent(
      new CustomEvent("select-package-audience", {
        detail: audience,
      }),
    );

    window.setTimeout(() => {
      document.getElementById("paketai")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  return (
    <section
      id="bendrijapro"
      className="overflow-hidden bg-primary text-primary-foreground"
    >
      <style>{`
        @keyframes bpToolkitFloat {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-9px);
          }
        }

        @keyframes bpToolkitFloatReverse {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(8px);
          }
        }

        @keyframes bpToolkitPulse {
          0%, 100% {
            opacity: 0.45;
            transform: scale(0.95);
          }

          50% {
            opacity: 0.9;
            transform: scale(1.05);
          }
        }

        .bp-toolkit-main {
          animation: bpToolkitFloat 6s ease-in-out infinite;
        }

        .bp-toolkit-card-one {
          animation: bpToolkitFloatReverse 5s ease-in-out infinite;
        }

        .bp-toolkit-card-two {
          animation: bpToolkitFloat 5.5s ease-in-out 0.7s infinite;
        }

        .bp-toolkit-card-three {
          animation: bpToolkitFloat 5.2s ease-in-out 1.1s infinite;
        }

        .bp-toolkit-card-four {
          animation: bpToolkitFloatReverse 5.8s ease-in-out 1.5s infinite;
        }

        .bp-toolkit-glow {
          animation: bpToolkitPulse 6s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .bp-toolkit-main,
          .bp-toolkit-card-one,
          .bp-toolkit-card-two,
          .bp-toolkit-card-three,
          .bp-toolkit-card-four,
          .bp-toolkit-glow {
            animation: none;
          }
        }
      `}</style>

      <div className="container-wide grid items-center gap-14 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <span
            className="eyebrow"
            style={{ color: "hsl(var(--accent))" }}
          >
            BendrijaPRO
          </span>

          <h1 className="mt-5 max-w-3xl font-heading text-4xl font-semibold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
            Administravimo įrankiai bendrijoms, bendruomenėms ir asociacijoms
          </h1>

          <span
            className="mt-6 inline-block h-[2px] w-12 bg-accent"
            aria-hidden
          />

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">
            Paruošti Excel registrai, dokumentų šablonai, instrukcijos ir DI
            pagalba, kad administravimo nereikėtų kurti nuo nulio.
          </p>

          <p className="mt-4 max-w-2xl font-heading text-base font-semibold text-accent md:text-lg">
            Pasirinkite, kokiai organizacijai ieškote sprendimo.
          </p>

          <div className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => chooseAudience("bendrija")}
              className="group flex items-center gap-4 rounded-lg border border-primary-foreground/25 bg-primary-foreground/5 p-5 text-left transition-all hover:border-accent hover:bg-primary-foreground/10"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                <Building2 className="h-5 w-5" aria-hidden />
              </span>

              <span>
                <span className="block font-heading text-base font-semibold text-primary-foreground">
                  Ieškau sprendimo bendrijai
                </span>

                <span className="mt-1 block text-xs leading-relaxed text-primary-foreground/65">
                  Nariams, sklypams, mokėjimams, skoloms ir dokumentams.
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => chooseAudience("bendruomene")}
              className="group flex items-center gap-4 rounded-lg border border-primary-foreground/25 bg-primary-foreground/5 p-5 text-left transition-all hover:border-accent hover:bg-primary-foreground/10"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                <UsersRound className="h-5 w-5" aria-hidden />
              </span>

              <span>
                <span className="block font-heading text-base font-semibold text-primary-foreground">
                  Ieškau sprendimo bendruomenei
                </span>

                <span className="mt-1 block text-xs leading-relaxed text-primary-foreground/65">
                  Registrams, susirinkimams, projektams ir ataskaitoms.
                </span>
              </span>
            </button>
          </div>

          <p className="mt-6 max-w-2xl text-sm text-primary-foreground/60">
            BendrijaPRO nėra buhalterinė programa ar administravimo paslauga.
            Tai paruoštų redaguojamų failų ir praktinių įrankių rinkinys.
          </p>
        </div>

        <div className="lg:col-span-5" aria-hidden="true">
          <div className="relative mx-auto min-h-[440px] w-full max-w-md">
            <div className="bp-toolkit-glow absolute inset-12 rounded-full bg-accent/25 blur-3xl" />

            <div className="bp-toolkit-card-one absolute left-0 top-5 z-20 flex items-center gap-3 rounded-xl border border-white/20 bg-white px-4 py-3 shadow-xl">
              <FileSpreadsheet className="h-5 w-5 shrink-0 text-accent" />

              <div>
                <p className="font-heading text-xs font-semibold text-primary">
                  Excel sistema
                </p>

                <p className="text-[11px] text-muted-foreground">
                  Registrams ir suvestinėms
                </p>
              </div>
            </div>

            <div className="bp-toolkit-card-two absolute right-0 top-16 z-20 flex items-center gap-3 rounded-xl border border-white/20 bg-white px-4 py-3 shadow-xl">
              <FileText className="h-5 w-5 shrink-0 text-accent" />

              <div>
                <p className="font-heading text-xs font-semibold text-primary">
                  Dokumentų šablonai
                </p>

                <p className="text-[11px] text-muted-foreground">
                  Paruošti redaguoti
                </p>
              </div>
            </div>

            <div className="bp-toolkit-main absolute inset-x-7 top-28 z-10 rounded-2xl border border-white/20 bg-white p-6 text-primary shadow-2xl sm:inset-x-9">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                    Įrankių rinkinys
                  </span>

                  <h2 className="mt-3 font-heading text-xl font-semibold text-primary">
                    BendrijaPRO
                  </h2>

                  <p className="mt-3 text-sm text-muted-foreground">
                    Praktiniai failai ir instrukcijos aiškesniam kasdieniam
                    administravimui.
                  </p>
                </div>

                <CheckCircle2 className="h-7 w-7 shrink-0 text-accent" />
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 rounded-lg bg-surface px-4 py-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />

                  <span className="text-sm font-medium">
                    Paruošti naudoti failai
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-surface px-4 py-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />

                  <span className="text-sm font-medium">
                    Redaguojama pagal poreikį
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-surface px-4 py-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />

                  <span className="text-sm font-medium">
                    Aiškios naudojimo instrukcijos
                  </span>
                </div>
              </div>

              <p className="mt-6 border-t border-border pt-4 text-center text-xs font-medium text-muted-foreground">
                Aiškesnė pradžia administravimo darbams.
              </p>
            </div>

            <div className="bp-toolkit-card-three absolute bottom-5 left-0 z-20 flex items-center gap-3 rounded-xl border border-white/20 bg-white px-4 py-3 shadow-xl">
              <ListChecks className="h-5 w-5 shrink-0 text-accent" />

              <div>
                <p className="font-heading text-xs font-semibold text-primary">
                  Registrai ir suvestinės
                </p>

                <p className="text-[11px] text-muted-foreground">
                  Aiškesnei tvarkai
                </p>
              </div>
            </div>

            <div className="bp-toolkit-card-four absolute bottom-14 right-0 z-20 flex items-center gap-3 rounded-xl border border-white/20 bg-white px-4 py-3 shadow-xl">
              <BookOpen className="h-5 w-5 shrink-0 text-accent" />

              <div>
                <p className="font-heading text-xs font-semibold text-primary">
                  Naudojimo instrukcija
                </p>

                <p className="text-[11px] text-muted-foreground">
                  Žingsnis po žingsnio
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
