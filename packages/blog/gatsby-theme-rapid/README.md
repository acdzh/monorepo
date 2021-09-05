[Preview](https://blog.acdzh.com/)

## 🚀 Quick start

1. **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the blog starter.

    ```bash
    # create a new Gatsby site using the blog starter
    gatsby new my-blog-starter https://github.com/acdzh/gatsby-theme-rapid
    ```

1. **Modify the Site's Config.**
    Modify the config in `./gatsby-config.js`;

1. **Create Content Directory.**
    Create a directory like this:

    ```
    content
    ├── blog
    └── static
    ```

    You blogs should be `.md` files in the `blog` directory, and the everything in the `static` directory would be copied to the root path when after building.

1. **Preview**

    ```bash
    yarn dev --host 0.0.0.0
    ```

    Then you can see the site running at [`http://localhost:8000/`](http://localhost:8000/)

## Writing Articles

### Create new Articles

You can create a new article easily just like this:

```bash
yarn run new <article_name>
```

For Example:

```bash
yarn run new '/2021/this is my first article'

## or

yarn run new '/2021/this is my first article.md'
```

It will create the file at `./content/blog/2021/this is my first article.md`.

Another way, if you add a `/` at the end of `<article_name>` like `yarn run new '/2021/this is my first article/'`

It will create the file at `./content/blog/2021/this is my first article/index.md`.

By the way, the final effect of these two methods is equivalent.


### Article prams

There are many prams of an article.

|params name|requied|default value||
|:----:|:----:|:----:|:----:|
|title|✔|${filename}|The title of this article which will show in the post page and the list view.|
|date|✔|${now.format()}||
|draft|❎|false|This article will not be published when draft is `true`.|
|comment|❎|true|Whether this article can be commented.|
|description|❎|${the content of this article}|It will show after the title in the list page.|
author|❎|${the author infomation from global config}|The author.|
|from|❎||Whether this article comes from if it is Is reprinted.|
|slug|❎|${title}|The url slug|
|cover|❎||Cover image.|
|tags|❎|[]|List of tags.|
|series|❎|[]|List of series.|
|categories|❎|[]|List of categories.|


### Use Image

just `![](./image.jpg)` or `![](https://example.com/img.jpg)`

### Short Code

To Preview see [https://blog.acdzh.com/post/shortcode_test/](https://blog.acdzh.com/post/shortcode_test/)

Every available Short Code is at: [./src/templates/post-components.tsx](./src/templates/post-components.tsx)


## Theme

Edit [./src/style/theme.css](./src/style/theme.css)

## Deploy

```bash
yarn build
```

Then publish the `./public` folder.