import { Dialog } from "@headlessui/react";
import { produce } from "immer";
import { useReducer, useState } from "react";
import { NOTE_TYPES, NoteType, NoteTypeIcon } from "./NoteTypeIcon";

const HEADERS = [
	["Грин", "Мастард", "Оркид", "Пикок", "Плам", "Скарлет"],
	["Подсвечник", "Кинжал", "Свинцовая труба", "Револьвер", "Верёвка", "Гаечный ключ"],
	["Бальный зал", "Бильярдная", "Зимний сад", "Столовая", "Холл", "Кухня", "Библиотека", "Гостиная", "Кабинет"],
];

type State = {
	status: "pending" | "noting";
	sections: { title: string; table: NoteType[][] }[];
	activeCell: [number, number, number] | null;
};

const initialState: State = {
	status: "pending",
	sections: [
		{
			title: "Кто?",
			table: [
				new Array(7).fill(null),
				new Array(7).fill(null),
				new Array(7).fill(null),
				new Array(7).fill(null),
				new Array(7).fill(null),
				new Array(7).fill(null),
			],
		},
		{
			title: "Чем?",
			table: [
				new Array(7).fill(null),
				new Array(7).fill(null),
				new Array(7).fill(null),
				new Array(7).fill(null),
				new Array(7).fill(null),
				new Array(7).fill(null),
			],
		},
		{
			title: "Где?",
			table: [
				new Array(7).fill(null),
				new Array(7).fill(null),
				new Array(7).fill(null),
				new Array(7).fill(null),
				new Array(7).fill(null),
				new Array(7).fill(null),
				new Array(7).fill(null),
				new Array(7).fill(null),
				new Array(7).fill(null),
			],
		},
	],
	activeCell: null,
};

type Action =
	| { type: "OpenModal"; payload: { activeCell: [number, number, number] } }
	| { type: "CloseModal" }
	| { type: "AddNote"; payload: { noteType: NoteType } };

const reducer = produce((draft: State, action: Action) => {
	switch (action.type) {
		case "OpenModal":
			draft.status = "noting";
			draft.activeCell = action.payload.activeCell;
			break;

		case "CloseModal":
			draft.status = "pending";
			draft.activeCell = null;
			break;

		case "AddNote":
			draft.status = "pending";

			const [sectionIndex, rowIndex, cellIndex] = draft.activeCell as [number, number, number];
			draft.sections[sectionIndex].table[rowIndex][cellIndex] = action.payload.noteType;

			draft.activeCell = null;
			break;
	}
});

export default function App() {
	const [{ status, sections }, dispatch] = useReducer(reducer, initialState);

	return (
		<main className="flex flex-col gap-2 p-4 text-sm">
			<PlayerNamesSection />

			{sections.map((section, sectionIndex) => {
				const headers = HEADERS[sectionIndex];

				return (
					<section className="rounded bg-slate-700">
						<h2 className="p-2 border-b border-slate-500">{section.title}</h2>

						<div className="divide-y">
							{section.table.map((row, rowIndex) => (
								<div key={rowIndex} className="flex h-12 divide-x border-slate-500">
									<p
										key={headers[rowIndex]}
										className="flex items-center w-24 px-2 font-normal text-left border-slate-500"
									>
										{headers[rowIndex]}
									</p>

									{row.map((note, cellIndex) => (
										<button
											key={cellIndex}
											type="button"
											className="flex items-center justify-center w-table-cell border-slate-500"
											onClick={() =>
												dispatch({ type: "OpenModal", payload: { activeCell: [sectionIndex, rowIndex, cellIndex] } })
											}
										>
											<NoteTypeIcon noteType={note} />
										</button>
									))}
								</div>
							))}
						</div>
					</section>
				);
			})}

			<Dialog
				className="fixed inset-0 z-10 flex items-center justify-center"
				open={status === "noting"}
				onClose={() => dispatch({ type: "CloseModal" })}
			>
				<Dialog.Panel className="flex items-center justify-center w-3/4 gap-6 rounded shadow-xl h-44 bg-slate-800 text-slate-300">
					{NOTE_TYPES.map((noteType) => (
						<button
							type="button"
							className="p-4 rounded bg-slate-600"
							onClick={() => dispatch({ type: "AddNote", payload: { noteType } })}
						>
							<NoteTypeIcon noteType={noteType} />
						</button>
					))}
				</Dialog.Panel>
			</Dialog>
		</main>
	);
}

function PlayerNamesSection() {
	const [names, setNames] = useState<string[]>(new Array(7).fill(""));

	return (
		<section className="overflow-hidden rounded bg-slate-700">
			<div className="flex divide-x border-slate-500">
				<div className="w-24 p-2 min-w-24 grow-0">Игроки</div>

				{names.map((name, index) => (
					<input
						key={index}
						type="text"
						className="min-w-0 text-center grow border-slate-500 bg-slate-700"
						value={name}
						onChange={(event) => setNames(names.map((name, i) => (index === i ? event.target.value : name)))}
					/>
				))}
			</div>
		</section>
	);
}
