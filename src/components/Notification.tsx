interface Props {
  message: string;
  type: 'success' | 'error';
}

export default function Notification({ message, type }: Props) {
  return (
    <div className={`fixed top-20 right-4 z-[100] px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-slide-down text-sm font-medium ${
      type === 'success' ? 'bg-green-600' : 'bg-red-600'
    } text-white max-w-sm`}>
      {type === 'success' ? '✅' : '❌'} {message}
    </div>
  );
}
