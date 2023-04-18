module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    plugins: ["@typescript-eslint", "simple-import-sort", "unused-imports"],
    ignorePatterns: [".eslintrc.js", "webpack.config.js", "gulpfile.js"],
    extends: [
        "eslint:recommended",
        "next",
        "next/core-web-vitals",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    rules: {
        "no-unused-vars": "off",
        "no-console": "warn",
        "accessor-pairs": [
            "error",
            {
                "getWithoutSet": true,
                "setWithoutGet": true,
                "enforceForClassMembers": false
            }
        ],
        "no-prototype-builtins": "off",
        "no-unexpected-multiline": "off",
        "quotes": ["error", "double", {"allowTemplateLiterals": true}],
        "eol-last": "warn",
        "grouped-accessor-pairs": ["error", "setBeforeGet"],
        "@typescript-eslint/consistent-type-definitions": "error",
        "@typescript-eslint/dot-notation": "off",
        "@typescript-eslint/explicit-member-accessibility": [
            "off",
            {
                "accessibility": "explicit"
            }
        ],
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/member-ordering": [
            "error",
            {
                "default": {
                    "order": "alphabetically",
                    "memberTypes": [["set", "get"]]
                },
                "classes": {
                    "order": "alphabetically",
                    "memberTypes": [
                        ["public-static-set", "public-static-get"],
                        ["protected-static-set", "protected-static-get"],
                        "public-static-field",
                        "protected-static-field",
                        "private-static-field",
                        ["private-static-set", "private-static-get"],
                        [
                            "public-decorated-set",
                            "public-decorated-get",
                            "public-instance-set",
                            "public-instance-get"
                        ],
                        [
                            "protected-decorated-set",
                            "protected-decorated-get",
                            "protected-instance-set",
                            "protected-instance-get"
                        ],
                        [
                            "private-decorated-set",
                            "private-decorated-get",
                            "private-instance-set",
                            "private-instance-get"
                        ],
                        "public-field",
                        "protected-field",
                        "private-field",
                        "constructor",
                        "public-static-method",
                        "protected-static-method",
                        "private-static-method",
                        "public-instance-method",
                        "protected-instance-method",
                        "private-instance-method"
                    ]
                }
            }
        ],
        "@typescript-eslint/naming-convention": [
            "error",
            {
                "selector": "default",
                "format": ["camelCase"]
            },
            {
                "selector": "objectLiteralProperty",
                "format": null,
                "modifiers": ["requiresQuotes"]
            },
            {
                "selector": "objectLiteralProperty",
                "format": ["camelCase", "snake_case", "PascalCase"]
            },
            {
                "selector": "function",
                "format": ["PascalCase", "camelCase"]
            },
            {
                "selector": "variable",
                "format": ["camelCase"],
                "leadingUnderscore": "forbid"
            },
            {
                "selector": "variable",
                "modifiers": ["exported"],
                "format": ["UPPER_CASE"],
                "leadingUnderscore": "forbid"
            },
            {
                "selector": "parameter",
                "format": ["camelCase", "PascalCase"],
                "leadingUnderscore": "forbid"
            },
            {
                "selector": "parameter",
                "modifiers": ["unused"],
                "format": ["camelCase"],
                "leadingUnderscore": "require",
                "trailingUnderscore": "require"
            },
            {
                "selector": "memberLike",
                "modifiers": ["public", "static", "readonly"],
                "format": ["UPPER_CASE"],
                "leadingUnderscore": "forbid"
            },
            {
                "selector": "memberLike",
                "modifiers": ["protected", "static", "readonly"],
                "format": ["UPPER_CASE"],
                "leadingUnderscore": "require"
            },
            {
                "selector": "memberLike",
                "modifiers": ["private", "static", "readonly"],
                "format": ["UPPER_CASE"],
                "leadingUnderscore": "require"
            },
            {
                "selector": "memberLike",
                "modifiers": ["public"],
                "format": ["camelCase"],
                "leadingUnderscore": "forbid"
            },
            {
                "selector": "memberLike",
                "modifiers": ["protected"],
                "format": ["camelCase"],
                "leadingUnderscore": "require"
            },
            {
                "selector": "memberLike",
                "modifiers": ["private"],
                "format": ["camelCase"],
                "leadingUnderscore": "require"
            },
            {
                "selector": "accessor",
                "modifiers": ["static", "public"],
                "format": ["UPPER_CASE"],
                "leadingUnderscore": "forbid"
            },
            {
                "selector": "memberLike",
                "modifiers": ["static", "readonly"],
                "format": ["UPPER_CASE"],
                "leadingUnderscore": "forbid"
            },
            {
                "selector": "memberLike",
                "modifiers": ["private", "static", "readonly"],
                "format": ["UPPER_CASE"],
                "leadingUnderscore": "require"
            },
            {
                "selector": "accessor",
                "modifiers": ["static", "protected"],
                "format": ["UPPER_CASE"],
                "leadingUnderscore": "require"
            },
            {
                "selector": "accessor",
                "modifiers": ["static", "private"],
                "format": ["UPPER_CASE"],
                "leadingUnderscore": "require"
            },
            {
                "selector": "typeLike",
                "format": ["PascalCase"]
            },
            {
                "selector": "enumMember",
                "format": ["UPPER_CASE"]
            }
        ],
        "react/no-unescaped-entities": "off",
        "react/display-name": "off",
        "react/jsx-curly-brace-presence": [
            "warn",
            {props: "never", children: "never"}
        ],

        //#region  //*=========== Unused Import ===========
        "@typescript-eslint/no-unused-vars": "off",
        "unused-imports/no-unused-imports": "warn",
        "unused-imports/no-unused-vars": [
            "warn",
            {
                vars: "all",
                varsIgnorePattern: "^_",
                args: "after-used",
                argsIgnorePattern: "^_"
            }
        ],
        //#endregion  //*======== Unused Import ===========

        //#region  //*=========== Import Sort ===========
        "simple-import-sort/exports": "warn",
        "simple-import-sort/imports": [
            "warn",
            {
                groups: [
                    // ext library & side effect imports
                    ["^@?\\w", "^\\u0000"],
                    // {s}css files
                    ["^.+\\.s?css$"],
                    // Lib and hooks
                    ["^@/lib", "^@/hooks"],
                    // static data
                    ["^@/data"],
                    // components
                    ["^@/components", "^@/container"],
                    // zustand store
                    ["^@/store"],
                    // Other imports
                    ["^@/"],
                    // relative paths up until 3 level
                    [
                        "^\\./?$",
                        "^\\.(?!/?$)",
                        "^\\.\\./?$",
                        "^\\.\\.(?!/?$)",
                        "^\\.\\./\\.\\./?$",
                        "^\\.\\./\\.\\.(?!/?$)",
                        "^\\.\\./\\.\\./\\.\\./?$",
                        "^\\.\\./\\.\\./\\.\\.(?!/?$)"
                    ],
                    ["^@/types"],
                    // other that didn't fit in
                    ["^"]
                ]
            }
        ]
        //#endregion  //*======== Import Sort ===========
    },
    globals: {
        React: true,
        JSX: true
    }
};
