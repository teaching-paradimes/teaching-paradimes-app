const project_collection_name = "teaching-paradimes"
const main_search_field = "course_title"

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
    server: {
        apiKey: "7mbYDBzumq1MESzGpdlhKVZ9t6a6jAk5",
        nodes: [
            {
                host: "typesense.acdh-dev.oeaw.ac.at",
                port: "443",
                protocol: "https",
            },
        ],
    },
    additionalSearchParameters: {
        query_by: main_search_field,
    },
});

const searchClient = typesenseInstantsearchAdapter.searchClient;
const search = instantsearch({
    searchClient,
    indexName: project_collection_name,
});

search.addWidgets([
    instantsearch.widgets.searchBox({
        container: "#searchbox",
        autofocus: true,
        cssClasses: {
            form: "form-inline",
            input: "form-control col-md-11",
            submit: "btn",
            reset: "btn",
        },
    }),

    instantsearch.widgets.hits({
        container: "#hits",
        cssClasses: {
            item: "w-100"
        },
        templates: {
            empty: "Keine Resultate für <q>{{ query }}</q>",
            item(hit, { html, components }) {
                return html` 
            <h3>${hit.course_title}</h3>
            <p>${hit._snippetResult.course_title.matchedWords.length > 0 ? components.Snippet({ hit, attribute: 'course_title' }) : ''}</p>
            <small>Instructor: </small> ${hit.instructor} <br />
            ${hit.institute[0].value}, ${hit.university[0].value}, ${hit.country[0].value}            
            `;
            },
        },
    }),

    instantsearch.widgets.pagination({
        container: "#pagination",
    }),

    instantsearch.widgets.stats({
        container: "#stats-container",
        templates: {
            text: `
            {{#areHitsSorted}}
              {{#hasNoSortedResults}}keine Treffer{{/hasNoSortedResults}}
              {{#hasOneSortedResults}}1 Treffer{{/hasOneSortedResults}}
              {{#hasManySortedResults}}{{#helpers.formatNumber}}{{nbSortedHits}}{{/helpers.formatNumber}} Treffer {{/hasManySortedResults}}
              aus {{#helpers.formatNumber}}{{nbHits}}{{/helpers.formatNumber}}
            {{/areHitsSorted}}
            {{^areHitsSorted}}
              {{#hasNoResults}}keine Treffer{{/hasNoResults}}
              {{#hasOneResult}}1 Treffer{{/hasOneResult}}
              {{#hasManyResults}}{{#helpers.formatNumber}}{{nbHits}}{{/helpers.formatNumber}} Treffer{{/hasManyResults}}
            {{/areHitsSorted}}
            gefunden in {{processingTimeMS}}ms
          `,
        },
    }),
    instantsearch.widgets.refinementList({
        container: "#refinement-list-course_type",
        attribute: "course_type.value",
        searchable: true,
        searchablePlaceholder: "Suchen",
        cssClasses: {
            searchableInput: "form-control form-control-sm m-2 border-light-2",
            searchableSubmit: "d-none",
            searchableReset: "d-none",
            showMore: "btn btn-secondary btn-sm align-content-center",
            list: "list-unstyled",
            count: "badge m-2 badge-secondary hideme ",
            label: "d-flex align-items-center text-capitalize",
            checkbox: "m-2",
        },
    }),

    instantsearch.widgets.refinementList({
        container: "#refinement-list-instructor",
        attribute: "instructor",
        searchable: true,
        searchablePlaceholder: "Suchen",
        cssClasses: {
            searchableInput: "form-control form-control-sm m-2 border-light-2",
            searchableSubmit: "d-none",
            searchableReset: "d-none",
            showMore: "btn btn-secondary btn-sm align-content-center",
            list: "list-unstyled",
            count: "badge m-2 badge-secondary hideme ",
            label: "d-flex align-items-center text-capitalize",
            checkbox: "m-2",
        },
    }),

    instantsearch.widgets.refinementList({
        container: "#refinement-list-country",
        attribute: "country.value",
        searchable: true,
        searchablePlaceholder: "Suchen",
        cssClasses: {
            searchableInput: "form-control form-control-sm m-2 border-light-2",
            searchableSubmit: "d-none",
            searchableReset: "d-none",
            showMore: "btn btn-secondary btn-sm align-content-center",
            list: "list-unstyled",
            count: "badge m-2 badge-secondary hideme ",
            label: "d-flex align-items-center text-capitalize",
            checkbox: "m-2",
        },
    }),

    instantsearch.widgets.refinementList({
        container: "#refinement-list-university",
        attribute: "university.value",
        searchable: true,
        searchablePlaceholder: "Suchen",
        cssClasses: {
            searchableInput: "form-control form-control-sm m-2 border-light-2",
            searchableSubmit: "d-none",
            searchableReset: "d-none",
            showMore: "btn btn-secondary btn-sm align-content-center",
            list: "list-unstyled",
            count: "badge m-2 badge-secondary hideme ",
            label: "d-flex align-items-center text-capitalize",
            checkbox: "m-2",
        },
    }),

    // instantsearch.widgets.refinementList({
    //     container: "#refinement-list-institute",
    //     attribute: "institute.value",
    //     searchable: true,
    //     searchablePlaceholder: "Suchen",
    //     cssClasses: {
    //         searchableInput: "form-control form-control-sm m-2 border-light-2",
    //         searchableSubmit: "d-none",
    //         searchableReset: "d-none",
    //         showMore: "btn btn-secondary btn-sm align-content-center",
    //         list: "list-unstyled",
    //         count: "badge m-2 badge-secondary hideme ",
    //         label: "d-flex align-items-center text-capitalize",
    //         checkbox: "m-2",
    //     },
    // }),

    instantsearch.widgets.refinementList({
        container: "#refinement-list-semester",
        attribute: "semester.value",
        searchable: true,
        searchablePlaceholder: "Suchen",
        cssClasses: {
            searchableInput: "form-control form-control-sm m-2 border-light-2",
            searchableSubmit: "d-none",
            searchableReset: "d-none",
            showMore: "btn btn-secondary btn-sm align-content-center",
            list: "list-unstyled",
            count: "badge m-2 badge-secondary hideme ",
            label: "d-flex align-items-center text-capitalize",
            checkbox: "m-2",
        },
    }),

    instantsearch.widgets.refinementList({
        container: "#refinement-list-discipline",
        attribute: "discipline.value",
        searchable: true,
        searchablePlaceholder: "Suchen",
        cssClasses: {
            searchableInput: "form-control form-control-sm m-2 border-light-2",
            searchableSubmit: "d-none",
            searchableReset: "d-none",
            showMore: "btn btn-secondary btn-sm align-content-center",
            list: "list-unstyled",
            count: "badge m-2 badge-secondary hideme ",
            label: "d-flex align-items-center text-capitalize",
            checkbox: "m-2",
        },
    }),

   
    instantsearch.widgets.clearRefinements({
        container: "#clear-refinements",
        templates: {
            resetLabel: "Filter zurücksetzen",
        },
        cssClasses: {
            button: "btn",
        },
    }),

    instantsearch.widgets.currentRefinements({
        container: "#current-refinements",
        cssClasses: {
            delete: "btn",
            label: "badge",
        },
    }),

        // instantsearch.widgets.sortBy({
        //     container: "#sort-by",
        //     items: [
        //         { label: "Jahr (aufsteigend)", value: "gestrich_index/sort/year:asc" },
        //         { label: "Jahr (absteigend)", value: "gestrich_index/sort/year:desc" },
        //     ],
        // }),

    instantsearch.widgets.configure({
        hitsPerPage: 20,
        attributesToSnippet: ["main_search_field"],
    }),

]);

search.start();