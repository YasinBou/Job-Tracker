interface NoteModalProps {
  title: string;
  children: React.ReactNode;
}

export const NoteModal = ({ title, children }: NoteModalProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
      <h1 className="text-2xl font-semibold mb-4">{title}</h1>
      <div className="text-gray-700">{children}</div>
    </div>
  );
};
