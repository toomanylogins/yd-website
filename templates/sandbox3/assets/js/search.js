const searchClient = algoliasearch('A574RBN3DT', '7910f203bb320833aa01d152561f5ba7');
//const article = document.getElementById('articles'); /*  hide the div on no reslt */
//const hitlist = document.getElementById('hitlist'); /*  hide the div on no reslt */

const search = instantsearch({
    indexName: 'youdocms',
    routing: true,
    searchClient,
    searchFunction(helper) {

        const container = document.querySelector('#hitlist');
        const article = document.querySelector('#articles');

        container.style.display = helper.state.query === '' ? 'none' : '';
        article.style.display = helper.state.query === '' ? 'block' : '';
        
        article.style.display = helper.state.query  ? 'none' : '';

       // if (helper.state.query) {
            /* This block allows access to the helper event */

            helper.search();

            // console.log(search.helper.state.query);

            
            // if ((search.helper.lastResults.hits.length) > 0) {
            //     article.style.display = 'none';
            // } else {
            //     article.style.display = 'block';
            // };

    //    } else {
            /* reset if query empty */
            // hitlist.style.display = 'none';
            // article.style.display = 'block';
     //       console.log('empty search');
            /* issue is that algolia is inserting the hits after serac has return. */

       // } /* end of helper event */



    },



});

search.addWidgets([
    instantsearch.widgets.searchBox({
        container: '#search-form',
        placeholder: 'Search',
        showReset: false,
        showSubmit: false,
        cssClasses: {
            root: 'form-floating mb-0',
            form: [
                'search-form',
            ],
            input: [
                'form-control',
            ]
        }
    }),

    instantsearch.widgets.hits({
        container: '#hitlist',
        templates: {
            empty: 'No results for <q>{{ query }}</q>',
            /*  item:document.getElementById('test123').style.display = 'none', */
            item: `
            <article class="item post">
            <div class="card">
                <div class="card-body">
                    <div class="post-header">
                        <div class="post-category text-line">
                            <a href="#" class="hover" rel="category">
                                <!--#4DTEXT page_o.category.title--></a>
                        </div>
                        <!-- /.post-category -->
                        <h2 class="post-title h3 mt-1 mb-3"><a class="link-dark"
                            href="{{path}}">
                            {{title}}</a></h2>
                    </div>
                    <!-- /.post-header -->
                    <div class="post-content">
                        {{ metadesc }}
                    </div>
                    <!-- /.post-content -->
                </div>
                <!--/.card-body -->
                <div class="card-footer">
                    <ul class="post-meta d-flex mb-0">
                        <li class="post-date"><i class="uil uil-calendar-alt"></i><span>
                                <!--#4DTEXT $post.publish_up--></span></li>
                        <li class="post-comments"><a href="#"><i
                                    class="uil uil-comment"></i>4</a></li>
                        <li class="post-likes ms-auto"><a href="#"><i
                                    class="uil uil-heart-alt"></i>5</a></li>
                    </ul>
                    <!-- /.post-meta -->
                </div>
                <!-- /.card-footer -->
            </div>
            <!-- /.card -->
        </article>
            `,
            submit: 'submit',
        },
    }),
]);

search.start();
