
(async function () {
	const tbody = document.querySelector<HTMLElement>(".pkc-table tbody");
	if (tbody) {
		await addTableRow(
			tbody,
			"isConditionalMediationAvailable",
			(await PublicKeyCredential.isConditionalMediationAvailable()));
		await addTableRow(
			tbody,
			"isUserVerifyingPlatformAuthenticatorAvailable",
			(await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()));
	}
})();

async function addTableRow(tbody: HTMLElement, ...values: any[]): Promise<void> {
	const tr = document.createElement("tr");

	for (const value of values) {
		const td = document.createElement("td");
		td.textContent = value;
		tr.appendChild(td);
	}

	tbody.appendChild(tr);
}
