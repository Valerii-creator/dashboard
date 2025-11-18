
import React from 'react';
import type { SalesPerformance } from '../types';
import { AlertTriangle } from 'lucide-react';

interface RiskHighlightProps {
  data: SalesPerformance[];
}

const RiskHighlight: React.FC<RiskHighlightProps> = ({ data }) => {
  const risks = data
    .map(item => ({
      ...item,
      deviationValue: (item.fact - item.plan) * item.price,
    }))
    .filter(item => item.deviationValue < 0)
    .sort((a, b) => a.deviationValue - b.deviationValue)
    .slice(0, 3);

  return (
    <div className="space-y-4">
      {risks.length > 0 ? (
        risks.map(risk => (
          <div key={risk.productName} className="flex items-center p-3 bg-red-900/50 border border-red-700 rounded-lg">
            <AlertTriangle className="w-8 h-8 text-red-400 mr-4 flex-shrink-0" />
            <div>
              <p className="font-bold text-white">{risk.productName}</p>
              <p className="text-sm text-red-300">
                Отклонение: {(risk.deviationValue / 1000).toLocaleString('ru-RU', { maximumFractionDigits: 2 })} млн. руб
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-full p-4 bg-green-900/50 border border-green-700 rounded-lg">
          <p className="text-green-300">Нет значительных отрицательных отклонений.</p>
        </div>
      )}
    </div>
  );
};

export default RiskHighlight;
