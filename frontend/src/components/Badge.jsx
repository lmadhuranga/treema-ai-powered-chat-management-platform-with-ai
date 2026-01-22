const CHANNEL_LABELS = {
  web: "WEB",
  whatsapp: "WHATSAPP",
  telegram: "TELEGRAM",
  email: "EMAIL"
};

function getChannelLabel(channel) {
  return CHANNEL_LABELS[channel] || "UNKNOWN";
}

export default function Badge({ tone, children, channel }) {
  let content = children;
  if (content === undefined && channel) {
    content = getChannelLabel(channel);
  }

  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${tone}`}
    >
      {content}
    </span>
  );
}
