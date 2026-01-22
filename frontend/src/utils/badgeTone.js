export function getPriorityTone(priorityLevel) {
  switch (priorityLevel) {
    case "HIGH":
      return "border-red-200 bg-red-50 text-red-700";
    case "MEDIUM":
      return "border-amber-200 bg-amber-50 text-amber-700";
    case "LOW":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    default:
      return "border-slate-200 bg-slate-50 text-slate-600";
  }
}

export function getIntentTone(intent) {
  switch (intent) {
    case "refund_request":
      return "border-red-200 bg-red-50 text-red-700";
    case "delay_inquiry":
      return "border-amber-200 bg-amber-50 text-amber-700";
    case "praise":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    default:
      return "border-slate-200 bg-slate-50 text-slate-600";
  }
}
