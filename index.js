#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import { createSpinner } from 'nanospinner';

// figlet

let quizTemplate = {
	current: 1,
	show: 1,
	mediaPointsTotal: 0,
	itPointsTotal: 0,
	questions: [
		{
			question: 'Er du interessert i koding?',
			answers: [
				{ answer: 'Ja! Jeg kan allerede kode.', mediaPoints: 0, itPoints: 2 },
				{ answer: 'Ja, men kan ikke kode.', mediaPoints: 0, itPoints: 1 },
				{ answer: 'Nei, der høres ikke gøy ut.', mediaPoints: 0, itPoints: 0 },
			],
			userAnswer: null,
		},
		{
			question: 'Liker du å ta bilder?',
			answers: [
				{ answer: 'Jeg gjør det hele tiden!', mediaPoints: 2, itPoints: 0 },
				{ answer: 'Gjør det ikke så ofte, men har lyst til å lære om det.', mediaPoints: 1, itPoints: 0 },
				{ answer: 'Det er så kjedelig å ta bilder.', mediaPoints: 0, itPoints: 0 },
			],
			userAnswer: null,
		},
		{
			question: 'Er du kreativ?',
			answers: [
				{ answer: 'Ja, jeg er superkreativ! Jeg har mange gode ideer.', mediaPoints: 2, itPoints: 2 },
				{ answer: 'Jeg er litt kreativ.', mediaPoints: 1, itPoints: 1 },
				{ answer: 'Nei, ingen kreativitet hos meg.', mediaPoints: 0, itPoints: 0 },
			],
			userAnswer: null,
		},
		{
			question: 'Synes du det er gøy å redigere bilder?',
			answers: [
				{ answer: 'Ja. Det er spennende, har gjort det mange ganger.', mediaPoints: 2, itPoints: 0 },
				{ answer: 'Ja, har gjort det av og til. Vil gjerne lære mer.', mediaPoints: 1, itPoints: 0 },
				{ answer: 'Nei, det høres ikke gøy ut.', mediaPoints: 0, itPoints: 0 },
			],
			userAnswer: null,
		},
		{
			question: 'Er du glad i å planlegge?',
			answers: [
				{ answer: 'Ja, jeg er en planleggingsekspert!', mediaPoints: 2, itPoints: 2 },
				{ answer: 'Planlegger litt.', mediaPoints: 1, itPoints: 1 },
				{ answer: 'Nei, hva er poenget med å planlegge?', mediaPoints: 0, itPoints: 0 },
			],
			userAnswer: null,
		},
		{
			question: 'Hva synes du om markedsføring?',
			answers: [
				{ answer: 'Det er kult!', mediaPoints: 2, itPoints: 0 },
				{ answer: 'Helt greit.', mediaPoints: 1, itPoints: 0 },
				{ answer: 'Synes det er noe dritt.', mediaPoints: 0, itPoints: 0 },
			],
			userAnswer: null,
		},
		{
			question: 'Liker du å skrive historier eller fortellinger?',
			answers: [
				{ answer: 'Ja. Gjør det på fritiden.', mediaPoints: 2, itPoints: 0 },
				{ answer: 'Det går fint, men er ikke det beste jeg vet.', mediaPoints: 1, itPoints: 0 },
				{ answer: 'Huff, nei.', mediaPoints: 0, itPoints: 0 },
			],
			userAnswer: null,
		},
		{
			question: 'Liker du å lage bilder eller videoer?',
			answers: [
				{ answer: 'Ja. Gjør det hele tiden.', mediaPoints: 2, itPoints: 0 },
				{ answer: 'Ganske gøy det, gjør det av og til.', mediaPoints: 1, itPoints: 0 },
				{ answer: 'Nei, det er så kjedelig.', mediaPoints: 0, itPoints: 0 },
			],
			userAnswer: null,
		},
		{
			question: 'Har du hørt om universal utforming?',
			answers: [
				{ answer: 'Ja, det er superviktig.', mediaPoints: 0, itPoints: 2 },
				{ answer: 'Nei, men det høres spennende ut.', mediaPoints: 0, itPoints: 1 },
				{ answer: 'Nei. Bryr meg ikke om det.', mediaPoints: 0, itPoints: 0 },
			],
			userAnswer: null,
		},
		{
			question: 'Er du nøyaktig?',
			answers: [
				{ answer: 'Ja, alltid.', mediaPoints: 2, itPoints: 2 },
				{ answer: 'Ja, for det meste.', mediaPoints: 1, itPoints: 1 },
				{ answer: 'Egentlig ikke.', mediaPoints: 0, itPoints: 0 },
			],
			userAnswer: null,
		},
		{
			question: 'Liker du grafisk design?',
			answers: [
				{ answer: 'Ja. Det høres ganske gøy ut.', mediaPoints: 2, itPoints: 0 },
				{ answer: 'Kanskje?', mediaPoints: 1, itPoints: 0 },
				{ answer: 'Nei takk.', mediaPoints: 0, itPoints: 0 },
			],
			userAnswer: null,
		},
		{
			question: 'Har du bygget en PC før?',
			answers: [
				{ answer: 'Ja. Det er gøy.', mediaPoints: 0, itPoints: 2 },
				{ answer: 'Nei. Har lyst til å lære om det.', mediaPoints: 0, itPoints: 1 },
				{ answer: 'Det høres ikke gøy ut.', mediaPoints: 0, itPoints: 0 },
			],
			userAnswer: null,
		},
		{
			question: 'Er du god i programvare som Word, Excel og PowerPoint?',
			answers: [
				{ answer: 'Ja. Jeg kan kjempe mye.', mediaPoints: 0, itPoints: 2 },
				{ answer: 'Ja, er ganske god.', mediaPoints: 0, itPoints: 1 },
				{ answer: 'Er dårlig på det.', mediaPoints: 0, itPoints: 0 },
			],
			userAnswer: null,
		},
		{
			question: 'Er det viktig å lære om etikk, lovverk og personvern?',
			answers: [
				{ answer: 'Ja, det er veldig viktig.', mediaPoints: 1, itPoints: 1 },
				{ answer: 'Nei, hvem bryr seg?', mediaPoints: 0, itPoints: 0 },
			],
			userAnswer: null,
		},
		{
			question: 'Synes du ny teknologi er spennende?',
			answers: [
				{ answer: 'Ja. Følger alltid med på nye ting.', mediaPoints: 0, itPoints: 2 },
				{ answer: 'Ja, er ganske spennende.', mediaPoints: 0, itPoints: 1 },
				{ answer: 'Tja, holder meg til det jeg kan.', mediaPoints: 0, itPoints: 0 },
			],
			userAnswer: null,
		},
		{
			question: 'Er god på å fikse problemer?',
			answers: [
				{ answer: 'Ja. Prøver alltid å løse det selv om jeg kanskje feiler. ', mediaPoints: 0, itPoints: 2 },
				{ answer: 'Ikke den beste, men prøver av og til.', mediaPoints: 0, itPoints: 1 },
				{ answer: 'Nei, fikser aldri ting selv.', mediaPoints: 0, itPoints: 0 },
			],
			userAnswer: null,
		},
		{
			question: 'Er du god på å gi andre opplæring?',
			answers: [
				{ answer: 'Ja. Føler meg god på det.', mediaPoints: 0, itPoints: 2 },
				{ answer: 'Kanskje, vet ikke helt.', mediaPoints: 0, itPoints: 1 },
				{ answer: 'Nei, er dårlig på å lære bort.', mediaPoints: 0, itPoints: 0 },
			],
			userAnswer: null,
		},
		{
			question: 'Er du opptatt av design (typografi, layout, virkemidler og farger)?',
			answers: [
				{ answer: 'Ja. Synes det er viktig og gøy. Ting må se bra ut.', mediaPoints: 2, itPoints: 2 },
				{ answer: 'Litt? Er ikke så nøye.', mediaPoints: 1, itPoints: 1 },
				{ answer: 'Det er ikke viktig.', mediaPoints: 0, itPoints: 0 },
			],
			userAnswer: null,
		},
		{
			question: 'Har du tenkt på hvordan medier kan påvirke mennesker?',
			answers: [
				{ answer: 'Ja. Medier påvirker oss ganske mye.', mediaPoints: 2, itPoints: 2 },
				{ answer: 'Har hørt at medier påvirker, men har ikke tenkt noe på det.', mediaPoints: 1, itPoints: 1 },
				{ answer: 'Nei, det er bare drama. Er ikke så ille.', mediaPoints: 0, itPoints: 0 },
			],
			userAnswer: null,
		},
		{
			question: 'Vil du lære hvordan internett funker?',
			answers: [
				{ answer: 'Ja. Det høres spennende ut.', mediaPoints: 0, itPoints: 2 },
				{ answer: 'Er det så viktig? Er vel greit så lenge det funker.', mediaPoints: 0, itPoints: 0 },
			],
			userAnswer: null,
		},
		{
			question: 'Er du god på å lese bruksanvisninger?',
			answers: [
				{ answer: 'Ganske god. Finner ofte løsninger på problemet selv.', mediaPoints: 0, itPoints: 2 },
				{ answer: 'Nei, må ofte spørre andre om hjelp.', mediaPoints: 0, itPoints: 0 },
			],
			userAnswer: null,
		},
		{
			question: 'Hva er ruter, svitsj og aksesspunkt?',
			answers: [
				{ answer: 'Nettverkskomponenter.', mediaPoints: 0, itPoints: 1 },
				{ answer: 'Serverdeler.', mediaPoints: 0, itPoints: 0 },
				{ answer: 'Deler til prosessoren.', mediaPoints: 0, itPoints: 0 },
			],
			userAnswer: null,
		},
		{
			question: 'Hva er HTML, CSS, JavaScript, Python og SQL?',
			answers: [
				{ answer: 'Skjerminnstillinger.', mediaPoints: 0, itPoints: 0 },
				{ answer: 'PC-deler.', mediaPoints: 0, itPoints: 0 },
				{ answer: 'Kodespråk.', mediaPoints: 0, itPoints: 1 },
			],
			userAnswer: null,
		},
	],
};

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function runQuiz() {
	const rainbowTitle = chalkAnimation.rainbow('Sjekk om du bør gå IM, ta IM-quizen nå!\n');

	await sleep();

	rainbowTitle.stop();

	for (var qidx = 0; qidx < quizTemplate.questions.length; qidx++) {
		var choices = [];
		for (var aidx = 0; aidx < quizTemplate.questions[qidx].answers.length; aidx++) {
			choices.push(quizTemplate.questions[qidx].answers[aidx].answer);
		}

		const question = await inquirer.prompt({
			name: 'answer',
			type: 'list',
			message: quizTemplate.questions[qidx].question,
			choices: choices,
		});

		console.log(question.answer);
	}

	// rainbowTitle.stop();
}

runQuiz();
