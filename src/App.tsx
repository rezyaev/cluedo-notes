import { Dialog } from "@headlessui/react";
import { useState } from "react";

const SUSPECTS = ["Грин", "Мастард", "Оркид", "Пикок", "Плам", "Скарлет"];
const WEAPONS = ["Подсвечник", "Кинжал", "Свинцовая труба", "Револьвер", "Верёвка", "Гаечный ключ"];
const ROOMS = [
	"Бальный зал",
	"Бильярдная",
	"Зимний сад",
	"Столовая",
	"Холл",
	"Кухня",
	"Библиотека",
	"Гостиная",
	"Кабинет",
];

type NoteType = "check" | "x-mark" | "question-mark" | null;

type Sheet = "suspect" | "weapon" | "room" | null;

export default function App() {
	const [modalState, setModalState] = useState<{
		isOpen: boolean;
		sheet: Sheet;
		player: string | null;
		index: number | null;
	}>({
		isOpen: false,
		sheet: null,
		player: null,
		index: null,
	});

	const [playerNameMap, setPlayerNameMap] = useState({
		player1: "",
		player2: "",
		player3: "",
		player4: "",
		player5: "",
		player6: "",
		player7: "",
	});

	const [suspectSheet, setSuspectSheet] = useState<{ [key: string]: NoteType[] }>({
		player1: [null, null, null, null, null, null],
		player2: [null, null, null, null, null, null],
		player3: [null, null, null, null, null, null],
		player4: [null, null, null, null, null, null],
		player5: [null, null, null, null, null, null],
		player6: [null, null, null, null, null, null],
		player7: [null, null, null, null, null, null],
	});

	const [weaponSheet, setWeaponSheet] = useState<{ [key: string]: NoteType[] }>({
		player1: [null, null, null, null, null, null],
		player2: [null, null, null, null, null, null],
		player3: [null, null, null, null, null, null],
		player4: [null, null, null, null, null, null],
		player5: [null, null, null, null, null, null],
		player6: [null, null, null, null, null, null],
		player7: [null, null, null, null, null, null],
	});

	const [roomSheet, setRoomSheet] = useState<{ [key: string]: NoteType[] }>({
		player1: [null, null, null, null, null, null, null, null, null],
		player2: [null, null, null, null, null, null, null, null, null],
		player3: [null, null, null, null, null, null, null, null, null],
		player4: [null, null, null, null, null, null, null, null, null],
		player5: [null, null, null, null, null, null, null, null, null],
		player6: [null, null, null, null, null, null, null, null, null],
		player7: [null, null, null, null, null, null, null, null, null],
	});

	function handleModalButtonClick(noteType: NoteType) {
		if (modalState.player === null || modalState.index === null || modalState.sheet === null)
			throw new Error("Player, sheet and index are required");

		if (modalState.sheet === "suspect") {
			let notes = [...suspectSheet[modalState.player]];
			notes.splice(modalState.index, 1, noteType);
			setSuspectSheet({ ...suspectSheet, [modalState.player]: notes });
		} else if (modalState.sheet === "weapon") {
			let notes = [...weaponSheet[modalState.player]];
			notes.splice(modalState.index, 1, noteType);
			setWeaponSheet({ ...weaponSheet, [modalState.player]: notes });
		} else if (modalState.sheet === "room") {
			let notes = [...roomSheet[modalState.player]];
			notes.splice(modalState.index, 1, noteType);
			setRoomSheet({ ...roomSheet, [modalState.player]: notes });
		}

		setModalState({ isOpen: false, sheet: null, player: null, index: null });
	}

	return (
		<main className="flex flex-col gap-2 p-4 text-sm">
			<section className="overflow-hidden rounded bg-slate-700">
				<div className="flex divide-x border-slate-500">
					<div className="w-24 p-2 min-w-24 grow-0">Игроки</div>

					{Object.entries(playerNameMap).map(([key, name]) => (
						<input
							key={key}
							type="text"
							className="min-w-0 text-center grow border-slate-500 bg-slate-700"
							value={name}
							onChange={(event) => setPlayerNameMap({ ...playerNameMap, [key]: event.target.value })}
						/>
					))}
				</div>
			</section>

			<section className="divide-y rounded bg-slate-700">
				<h2 className="p-2 border-slate-500">Кто?</h2>

				<div className="flex divide-x border-slate-500">
					<div className="divide-y">
						{SUSPECTS.map((suspect) => (
							<div key={suspect} className="flex items-center w-24 h-12 px-2 border-slate-500">
								{suspect}
							</div>
						))}
					</div>

					<div className="flex divide-x grow border-slate-500">
						{Object.entries(suspectSheet).map(([player, notes]) => (
							<div key={player} className="flex flex-col w-full divide-y border-slate-500">
								{notes.map((note, index) => (
									<button
										key={index}
										type="button"
										className="flex items-center justify-center h-12 border-slate-500"
										onClick={() => setModalState({ isOpen: true, sheet: "suspect", player, index })}
									>
										<NoteTypeIcon noteType={note} />
									</button>
								))}
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="divide-y rounded bg-slate-700">
				<h2 className="p-2 border-slate-500">Чем?</h2>

				<div className="flex divide-x border-slate-500">
					<div className="divide-y">
						{WEAPONS.map((weapon) => (
							<div key={weapon} className="flex items-center w-24 h-12 px-2 border-slate-500">
								{weapon}
							</div>
						))}
					</div>

					<div className="flex divide-x grow border-slate-500">
						{Object.entries(weaponSheet).map(([player, notes]) => (
							<div key={player} className="flex flex-col w-full divide-y border-slate-500">
								{notes.map((note, index) => (
									<button
										key={index}
										type="button"
										className="flex items-center justify-center h-12 border-slate-500"
										onClick={() => setModalState({ isOpen: true, sheet: "weapon", player, index })}
									>
										<NoteTypeIcon noteType={note} />
									</button>
								))}
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="divide-y rounded bg-slate-700">
				<h2 className="p-2 border-slate-500">Где?</h2>

				<div className="flex divide-x border-slate-500">
					<div className="divide-y">
						{ROOMS.map((room) => (
							<div key={room} className="flex items-center w-24 h-12 px-2 border-slate-500">
								{room}
							</div>
						))}
					</div>

					<div className="flex divide-x grow border-slate-500">
						{Object.entries(roomSheet).map(([player, notes]) => (
							<div key={player} className="flex flex-col w-full divide-y border-slate-500">
								{notes.map((note, index) => (
									<button
										key={index}
										type="button"
										className="flex items-center justify-center h-12 border-slate-500"
										onClick={() => setModalState({ isOpen: true, sheet: "room", player, index })}
									>
										<NoteTypeIcon noteType={note} />
									</button>
								))}
							</div>
						))}
					</div>
				</div>
			</section>

			<Dialog
				className="fixed inset-0 z-10 flex items-center justify-center"
				open={modalState.isOpen}
				onClose={() => setModalState({ ...modalState, isOpen: false })}
			>
				<Dialog.Panel className="flex items-center justify-center w-3/4 gap-6 rounded shadow-xl h-44 bg-slate-800 text-slate-300">
					<button type="button" className="p-4 rounded bg-slate-600" onClick={() => handleModalButtonClick("check")}>
						<CheckIcon />
					</button>

					<button type="button" className="p-4 rounded bg-slate-600" onClick={() => handleModalButtonClick("x-mark")}>
						<XMarkIcon />
					</button>

					<button
						type="button"
						className="p-4 rounded bg-slate-600"
						onClick={() => handleModalButtonClick("question-mark")}
					>
						<QuestionMarkIcon />
					</button>
				</Dialog.Panel>
			</Dialog>
		</main>
	);
}

function NoteTypeIcon({ noteType }: { noteType: NoteType }) {
	switch (noteType) {
		case "check":
			return <CheckIcon />;

		case "x-mark":
			return <XMarkIcon />;

		case "question-mark":
			return <QuestionMarkIcon />;

		default:
			return null;
	}
}

function CheckIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="w-6 h-6"
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
		</svg>
	);
}

function XMarkIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="w-6 h-6"
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
		</svg>
	);
}

function QuestionMarkIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="w-6 h-6"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
			/>
		</svg>
	);
}
