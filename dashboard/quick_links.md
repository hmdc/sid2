# Quick Links Configuration

Quick links are HTML templates that are render in the quick links section of the Sid dashboard homepage.  
The templates and their order are specified by the quick links configuration file: [application/app/views/widgets/config.yml](application/app/views/widgets/config.yml)

The file has a list of clusters identified by the cluster id. Each cluster define the list of templates to render.

The templates to render follow the rails naming convention for template partials. This means that the template name in the configuration file like `test_template_name` will render a template with a filename:
 * `application/app/views/widgets/_test_template_name.html`
 * or  
 * `application/app/views/widgets/_test_template_name.html.erb`

### Adding a new quick link

 * Create quick link template file under [application/app/views/widgets](application/app/views/widgets)
 * The template filename needs to start with `_`, follow by template name in [snake case](https://en.wikipedia.org/wiki/Snake_case).
 * The file extension needs to be `.html` if it is plain HTML or `.html.erb` if it uses ERB syntax to include application data.
 * Update the configuration to add the new template to the relevant cluster in the desired position - [application/app/views/widgets/config.yml](application/app/views/widgets/config.yml)

### Showing,Hiding Quick links on the Sid Dashboard index page

Update the configuration to add, remove or reorder the quick links - [application/app/views/widgets/config.yml](application/app/views/widgets/config.yml)

### Adding CSS and images to the templates

To add custom CSS to the template, we can add an style tag within the template with the desired CSS.
```
<style>
 .container {
    background-color: red;
 }
</style>
```

To add custom images to the template, we can use the assets folder: [application/app/assets/images](application/app/assets/images). Add the image to this folder (eg: `image_name.jpg`) and then reference the image in the template as:  
```
<img src="<%= asset_url 'image_name.jpg' %>" />
```

As this uses ERB syntax, we need to add the `.erb` extension to the template filename.