import { useState } from 'react';

const tabs = [
	{ id: 'description', label: 'Description' },
	{ id: 'additional-info', label: 'Additional information' },
	{ id: 'reviews', label: 'Reviews(0)' },
];

export function ProductTabs() {
	const [activeTab, setActiveTab] = useState('description');

	return (
		<div className="mt-10">
			<div className="flex border-b border-[#D8D8D8]">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						className={`px-4 py-2 text-[gray-600] ${
							activeTab === tab.id ? 'border-b border-[black] font-medium text-[black]' : ''
						}`}
						onClick={() => setActiveTab(tab.id)}
					>
						{tab.label}
					</button>
				))}
			</div>

			<div className="mt-4">
				{activeTab === 'description' && <p>Product description content goes here...</p>}
				{activeTab === 'additional-info' && <p>Additional information about the product...</p>}
				{activeTab === 'reviews' && <p>No reviews yet. Be the first to review!</p>}
			</div>
		</div>
	);
}
