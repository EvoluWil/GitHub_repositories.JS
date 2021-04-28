self.onmessage = function({data}){
    const template = render(data)
    postMessage(template)
}
function render({listItems, languageTag}){

    let html = "";
    const numberFormatter = new Intl.NumberFormat(languageTag);
    const dateFormatter = new Intl.DateTimeFormat(languageTag, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    listItems.forEach(item => {
        const forks = numberFormatter.format(item.forks);
        const created_at = dateFormatter.format(new Date(item.created_at));

        html += `
                <li>
                    <div>
                        <b>Name:</b> ${item.full_name}
                    </div>
                    <div>
                        <b>Created At:</b> ${created_at}
                    </div>
                    <div>
                        <b>Forks:</b> ${forks}
                    </div>
                </li>
                `;
    })
    return (html); 
}
