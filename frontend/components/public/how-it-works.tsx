const steps = [
  "Choose camera",
  "Pick dates",
  "Submit requirements",
  "Pay via GCash/Maya/Cash",
  "Wait for approval",
  "Pick up and return",
];

export function HowItWorks() {
  return (
    <section className="bg-stone-100 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
            How it works
          </p>
          <h2 className="mt-2 text-3xl font-bold text-stone-950">
            Simple rental flow, manual approval for safety.
          </h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step} className="rounded-lg bg-white p-5 shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-950 text-sm font-bold text-white">
                {index + 1}
              </span>
              <p className="mt-4 font-semibold text-stone-950">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

