interface BlueButtonProps {
  title: string;
}

export const BlueButton = ({ title }: BlueButtonProps) => {
  return (
    <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
      {title}
    </button>
  );
};
