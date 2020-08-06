import { Component, h, Prop, State } from '@stencil/core';
import { Octokit } from '@octokit/rest';
export class Post {
    async componentWillLoad() {
        const octokit = new Octokit();
        const resp = await octokit.gists.get({ gist_id: this.gistId });
        if (resp.status === 200) {
            this.gist = resp.data;
            const text = resp.data.files['README.md'].content;
            this.readme = (await octokit.markdown.render({ text })).data;
        }
    }
    renderPost() {
        const { html_url: gistURL, created_at: createdAt, owner: { login, html_url: htmlURL } } = this.gist;
        console.log(this.gist);
        return (h("article", null,
            h("header", null,
                h("h2", null,
                    h("a", { href: gistURL }, this.gist.description)),
                h("p", null,
                    "Posted ",
                    h("relative-time", { datetime: createdAt }),
                    " by ",
                    h("a", { href: htmlURL }, login))),
            h("div", { class: "content", innerHTML: this.readme })));
    }
    render() {
        return (h("li", null, this.gist ? this.renderPost() : h("div", null, "Loading...")));
    }
    static get is() { return "gh-post"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["post.css"]
    }; }
    static get styleUrls() { return {
        "$": ["post.css"]
    }; }
    static get properties() { return {
        "gistId": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "gist-id",
            "reflect": false
        }
    }; }
    static get states() { return {
        "gist": {}
    }; }
}
