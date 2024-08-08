interface SingleCardProps {
  image: string;

  CardTitle: string;

  children: React.ReactNode;
}

export default function SingleCard({
  image,

  children,
  CardTitle,
}: SingleCardProps) {
  return (
    <div className="mb-10 ml-12 mt-12 overflow-hidden rounded-lg bg-background-test-modal shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3 w-72 ">
      <img src={image} alt="" className="w-full" />
      <div className="p-8 text-center ">
        <h3>
          <button className="mb-4 block text-xl font-semibold text-dark hover:text-gray-500 dark:text-black ">
            {CardTitle}
          </button>
        </h3>

        <div className="mb-7 text-base leading-relaxed text-body-color dark:text-black">
          {children}
        </div>
      </div>
    </div>
  );
}
