import { Component, h, Prop } from '@stencil/core';
export class Blog {
    render() {
        return [
            h("header", null,
                h("slot", { name: "blog-name" },
                    h("h2", null, this.name))),
            h("main", null,
                h("ul", null,
                    h("slot", null)))
        ];
    }
    static get is() { return "gh-blog"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["blog.css"]
    }; }
    static get styleUrls() { return {
        "$": ["blog.css"]
    }; }
    static get properties() { return {
        "name": {
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
            "attribute": "name",
            "reflect": false
        }
    }; }
}
