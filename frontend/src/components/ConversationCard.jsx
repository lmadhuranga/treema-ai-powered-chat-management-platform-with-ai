import Badge from "./Badge.jsx";
import { getIntentTone, getPriorityTone } from "../utils/badgeTone.js";

export default function ConversationCard({
  conversation,
  active,
  onSelect,
  lastMessageAt
}) {
  const priorityLevel = conversation.priorityLevel;
  const intent = conversation.intent;

  const priorityTone = getPriorityTone(priorityLevel);
  const intentTone = getIntentTone(intent);

  const timeTone = active ? "text-slate-700" : "text-slate-500";
  const channelPillTint = active ? "bg-white/90 text-orange-700" : "bg-orange-100";
  const channelTone = `border-orange-200 ${channelPillTint} text-orange-700`;

  return (
    <button
      className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
        active
          ? "border-orange-300 bg-orange-50"
          : "border-amber-200 bg-white/80 hover:border-orange-200 hover:bg-orange-50"
      }`}
      type="button"
      onClick={() => onSelect(conversation)}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold">{conversation.guestKey}</p>
        <Badge tone={channelTone} channel={conversation.channel} />
      </div>
      {(priorityLevel || intent) && (
        <div className="mt-2 flex flex-wrap gap-2">
            {priorityLevel ? (
              <Badge tone={priorityTone}>{priorityLevel}</Badge>
            ) : null}
            {intent ? (
              <Badge tone={intentTone}>{intent.replaceAll("_", " ")}</Badge>
            ) : null}
          </div>
        )}
      <p className={`mt-2 text-xs ${timeTone}`}>{lastMessageAt}</p>
    </button>
  );
}
