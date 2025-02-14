import { useState } from 'react';

const tabs = [
	{ id: 'additional-info', label: 'Additional information' },
	{ id: 'reviews', label: 'Reviews(0)' },
];

export function ProductTabs({
	weight,
	approximateWeight,
	inlay,
	material,
	insert
}: { weight?: string; approximateWeight?: string; inlay?: string; material?: string; insert?: string }) {
	const [activeTab, setActiveTab] = useState('additional-info');

	return (
		<div className="mt-10">
			<div className="flex border-b border-[#D8D8D8]">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						className={`px-4 py-2 text-[gray-600] ${
							activeTab === tab.id ? 'border-b border-[black] font-medium text-[black]' : 'text-[#707070]'
						}`}
						onClick={() => setActiveTab(tab.id)}
					>
						{tab.label}
					</button>
				))}
			</div>

			<div className="mt-4 h-24">
				{activeTab === 'additional-info' && (
					<div>
						{weight && <p className='mt-1'>Weight: <span className='ml-2 text-[#707070]'>{weight}</span></p>}
						{approximateWeight && <p className='mt-1'>Approximate Weight: <span className='ml-2 text-[#707070]'>{approximateWeight}</span></p>}
						{inlay && <p className='mt-1'>Inlay: <span className='ml-2 text-[#707070]'>{inlay}</span></p>}
						{insert && <p className='mt-1'>Insert: <span className='ml-2 text-[#707070]'>{insert}</span></p>}
						{material && <p className='mt-1'>Material: <span className='ml-2 text-[#707070]'>{material}</span></p>}
					</div>
				)}
				{activeTab === 'reviews' && <p>No reviews yet. Be the first to review!</p>}
			</div>
		</div>
	);
}
