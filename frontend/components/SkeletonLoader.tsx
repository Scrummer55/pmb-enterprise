import React from 'react';
import { motion } from 'framer-motion';

export const SkeletonLoader: React.FC<{ count?: number; type?: 'card' | 'row' | 'text' }> = ({
  count = 1,
  type = 'card'
}) => {
  const shimmer = {
    initial: { backgroundPosition: '0% 0%' },
    animate: { backgroundPosition: '100% 100%' }
  };

  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            variants={shimmer}
            initial="initial"
            animate="animate"
            transition={{ duration: 1.5, repeat: Infinity }}
            className="p-10 border-4 border-black rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 h-48"
            style={{
              backgroundSize: '200% 200%'
            }}
          />
        ))}
      </div>
    );
  }

  if (type === 'row') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            variants={shimmer}
            initial="initial"
            animate="animate"
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl"
            style={{
              backgroundSize: '200% 200%'
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          variants={shimmer}
          initial="initial"
          animate="animate"
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"
          style={{
            backgroundSize: '200% 200%',
            width: i === count - 1 ? '80%' : '100%'
          }}
        />
      ))}
    </div>
  );
};

export const TableSkeleton: React.FC<{ rows?: number; columns?: number }> = ({
  rows = 5,
  columns = 5
}) => {
  const shimmer = {
    initial: { backgroundPosition: '0% 0%' },
    animate: { backgroundPosition: '100% 100%' }
  };

  return (
    <div className="overflow-x-auto border-4 border-black rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="bg-black/5 border-b-2 border-black">
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="px-6 py-4">
                <motion.div
                  variants={shimmer}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"
                  style={{ backgroundSize: '200% 200%' }}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIdx) => (
            <tr key={rowIdx} className="border-b border-black/10 hover:bg-black/2">
              {Array.from({ length: columns }).map((_, colIdx) => (
                <td key={colIdx} className="px-6 py-4">
                  <motion.div
                    variants={shimmer}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 1.5, repeat: Infinity, delay: rowIdx * 0.05 }}
                    className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"
                    style={{ backgroundSize: '200% 200%' }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const DashboardSkeleton: React.FC = () => {
  const shimmer = {
    initial: { backgroundPosition: '0% 0%' },
    animate: { backgroundPosition: '100% 100%' }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            variants={shimmer}
            initial="initial"
            animate="animate"
            transition={{ duration: 1.5, repeat: Infinity }}
            className="p-10 border-4 border-black rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 h-48"
            style={{ backgroundSize: '200% 200%' }}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <motion.div
          variants={shimmer}
          initial="initial"
          animate="animate"
          transition={{ duration: 1.5, repeat: Infinity }}
          className="lg:col-span-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 border-4 border-black rounded-lg h-96"
          style={{ backgroundSize: '200% 200%' }}
        />
        <motion.div
          variants={shimmer}
          initial="initial"
          animate="animate"
          transition={{ duration: 1.5, repeat: Infinity }}
          className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 border-4 border-black rounded-lg h-96"
          style={{ backgroundSize: '200% 200%' }}
        />
      </div>
    </div>
  );
};

export default SkeletonLoader;

