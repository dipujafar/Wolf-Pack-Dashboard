import { cn } from "@/lib/utils";

const EarningStatContainer = () => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 `}>
      <StatCard
        title='Total Earning'
        value='$1,250.00'
        className='bg-transparent'
      />
      <StatCard
        title='Today Earning'
        value='$2,000'
        className='bg-transparent'
      />
    </div>
  );
};

export default EarningStatContainer;

const StatCard = ({
  title,
  value,
  className,
}: {
  title: string;
  value: string | number;

  className?: string;
}) => {
  return (
    <div className={cn("rounded-2xl p-6 flex flex-col gap-1 text-white", className)}>
      <h3 className='text-sm  font-medium'>{title}</h3>

      <div className='p-4 border border-gray-300 rounded-lg'>
        <p>{value}</p>
        <svg
          width='20'
          height='18'
          viewBox='0 0 20 18'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M5 13V1M5 1L1 5M5 1L9 5M15 5V17M15 17L19 13M15 17L11 13'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
    </div>
  );
};
