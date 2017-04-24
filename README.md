# Transients

**Current Version 1.008**

_Version 1.009 in TEST MODE_

A Transient is a simple way of storing cached data in the database temporarily, by giving it a custom name and a timeframe after which it will expire and be deleted.

Transients are useful when pinging another API (i.e. Wordpress, Instagram, twitter), and saving data for a set period of time.

Once the module is installed, you will find a tab under **Utilities**. This batch list is used for debugging, viewing transients, and deleting transients.

## Please Note

To use this, you must use mvt:do, and having experience with mvt:do is recommended.

## Usage

There are two simple functions you can use:
- [Set_Transient](#set_transient)
- [Get_Transient](#get_transient)

<a name="set_transient"></a>

### Setting a Transient

```javascript
Set_Transient(key, value, expiration)
```
**Key**: This should be unique. If this key already exists, it will overwrite the value you had before. It is recommended you use this as a code (example: recent_posts, recent_tweets)

**Value**: The value you are saving/ storing. If you are wanting to save a miva array, serialize this before saving it

**Expiration**: The amount of seconds to save the transient


**Example Syntax of Set_Transient**

```xml
<mvt:do file="g.Module_Root $ '/modules/util/transients.mvc'" name="l.set_transient" value="Set_Transient( 'recent_posts', l.settings:my_value_here, 60*60*2)" />
```

<a name="get_transient"></a>

### Getting a Transient

```javascript
Get_Transient(key)
```
This will retrieve your transient. If you have a transient that has not expired, it will return the value. If it has expired, or does not exsist it will return null.

**Example Syntax of Get_Transient**

```xml
<mvt:do file="g.Module_Root $ '/modules/util/transients.mvc'" name="l.settings:recent_posts" value="Get_Transient( 'recent_posts' )" />
<mvt:if expr="l.settings:recent_posts">
	<mvt:eval expr="l.settings:recent_posts" />
</mvt:if>
```

# Example

This is an example of pulling a Blog's most recent posts, and displaying them on SFNT. In this case, the URL we are calling to will display the most recent posts.

```xml
<mvt:do file="g.Module_Root $ '/modules/util/transients.mvc'" name="l.settings:recent_posts" value="Get_Transient( 'recent_posts' )" />
<mvt:if expr="l.settings:recent_posts">
	<mvt:eval expr="l.settings:recent_posts" />
<mvt:else>
	<mvt:assign name="l.settings:recent_posts" value="''" />
	<mvt:call action="'http://www.mydomainname.com/blog/recent-posts/'" method="'POST'">
		<mvt:assign name="l.settings:recent_posts" value="l.settings:recent_posts $ s.callvalue" />
	</mvt:call>
	<mvt:do file="g.Module_Root $ '/modules/util/transients.mvc'" name="l.set_transient" value="Set_Transient( 'recent_posts', l.settings:recent_posts, 60*60*2)" />
	&mvt:recent_posts;
</mvt:if>
```

# Other Useful Functions with Examples

In Version 1.006 there are 4 new functions:
- [Transient_ReadyTheme_NavigationSet( readytheme_code, expires )](#Transient_ReadyTheme_NavigationSet)
- [Transient_Load_NavigationSet( readytheme_code )](#Transient_Load_NavigationSet)
- [Transient_ReadyTheme_Image( readytheme_code, expires )](#Transient_ReadyTheme_Image)
- [Transient_Load_Link( item var )](#Transient_Load_Link)
- [Transient_ReadyTheme_ContentSection( readytheme_code, expires, all_settings var )](#Transient_ReadyTheme_ContentSection)

<a name="Transient_ReadyTheme_NavigationSet"></a>

### Transient_ReadyTheme_NavigationSet

```javascript
Transient_ReadyTheme_NavigationSet( readytheme_code, expires )
```
**readytheme_code**: The ReadyTheme Navigation Set Code

**expires**: Amount of seconds to save the transient

This will first check if the transient exsists. If it does, it returns the transient. If it does not, it will set a transient with the key `navigationset__readytheme_code`, and save it. The return value is the rendered HTML data.

**Example Syntax of Transient_ReadyTheme_NavigationSet**
```xml
<mvt:do file="g.Module_Root $ '/modules/util/transients.mvc'" name="l.settings:my_navigation_set" value="Transient_ReadyTheme_NavigationSet( 'navigation_bar', 60*60*24)" />
<mvt:if expr="l.settings:my_navigation_set">
	&mvt:my_navigation_set;
<mvt:else>
	<mvt:comment> ==[ Failsafe, incase the Transient Fails ]== </mvt:comment>
	<mvt:item name="readytheme" param="navigationset( 'navigation_bar' )" />
</mvt:if>
```
**Using custom items in your Navigationset, like customfields?**
```javascript
Transient_ReadyTheme_NavigationSet_WithSettings( readytheme_code, expires, all_settings var )
```
**Example Syntax of Transient_ReadyTheme_NavigationSet_WithSettings**
```xml
<mvt:do file="g.Module_Root $ '/modules/util/transients.mvc'" name="l.settings:navigation_bar_customfields" value="Transient_ReadyTheme_NavigationSet_WithSettings( 'navigation_bar_customfields', 60*60*24, l.settings)" />
<mvt:if expr="l.settings:navigation_bar_customfields">
	&mvt:navigation_bar_customfields;
<mvt:else>
	<mvt:comment> ==[ Failsafe, incase the Transient Fails ]== </mvt:comment>
	<mvt:item name="readytheme" param="navigationset( 'navigation_bar_customfields' )" />
</mvt:if>
```

<a name="Transient_Load_NavigationSet"></a>

### Transient_Load_NavigationSet

```javascript
Transient_Load_NavigationSet( readytheme_code )
```
**readytheme_code**:The ReadyTheme NavigationSet Code

This returns the ReadyTheme Navigation Set `l.settings:readytheme` variable, including an extra variable in the navigationset, `:link_url` (the navigation item's link). This does **not** cache the data, this function only returns it.

**Example Syntax of Transient_Load_NavigationSet**
```xml
<mvt:do file="g.Module_Root $ '/modules/util/transients.mvc'" name="l.settings:load_navigationset" value="Transient_Load_NavigationSet( 'navigation_bar')" />
<mvt:if expr="l.settings:load_navigationset">
	<mvt:comment> ==[ Do something with data..]== </mvt:comment>
	<mvt:eval expr="glosub(miva_array_serialize(l.settings:load_navigationset), ',', '<br />')" />
</mvt:if>
```

<a name="Transient_ReadyTheme_Image"></a>

### Transient_ReadyTheme_Image

```javascript
Transient_ReadyTheme_Image( readytheme_code, expires )
```
**readytheme_code**: The ReadyTheme Image Code

**expires**: The amount of seconds to save the transient

This will first check if the transient exsists. If it does, it returns the transient. If it does not, it will set a transient with the key `image__readytheme_code`, and save it The return value is the serialized variable of the image.

The variable contains the following:

`active, code, cropped_url, id, image_hght, image_id, image_size, image_wdth, link, link_dest, link_targ, link_type, link_url, name, url`

**Example Syntax of Transient_ReadyTheme_Image**
```xml
<mvt:do file="g.Module_Root $ '/modules/util/transients.mvc'" name="l.settings:banner_1_image" value="Transient_ReadyTheme_Image( 'banner_1', 24*60*60)" />
<mvt:if expr="l.settings:banner_1_image">
	<mvt:assign name="l.settings:banner_1_image" value="miva_array_deserialize( l.settings:banner_1_image )" />
	<mvt:if expr="l.settings:cropped_url">
		<img data-lazy="&mvt:banner_1_image:cropped_url" alt="&mvt:banner_1_image:alt;" />
	<mvt:else>
		<img data-lazy="&mvt:banner_1_image:url" alt="&mvt:banner_1_image:alt" />
</mvt:if>
```

<a name="Transient_Load_Link"></a>

### Transient_Load_Link

```javascript
Transient_Load_Link( item var )
```
**item var**: The item variable

This returns the item, as well as `:link` and `:link_url`. This does **not** cache the data, this function only returns it. The variable must have the following in it's structure:
- link_type ( P, C, G, U, N )
- link_dest ( string )
- link_targ ( string )
- name (string)

**Example Syntax of Transient_Load_Link**
```xml
<mvt:do file="g.Module_Root $ '/modules/util/transients.mvc'" name="l.settings:my_var" value="Transient_Load_Link( l.settings:my_var )" />
<mvt:if expr="l.settings:my_var:link_url">
	<a href="&mvt:my_var:link_url">&mvt:my_var:name;</a>
<mvt:else>
	<span>&mvt:my_var:name;</span>
</mvt:if>
```

<a name="Transient_ReadyTheme_ContentSection"></a>

### Transient_ReadyTheme_ContentSection

**Please Note:** If you have custom logic that is outputting variables (i.e. g.show__breadcrumbs), this will not be cached/ output. This is best used when trying to display certain information.

```javascript
Transient_ReadyTheme_ContentSection( readytheme_code, expires, all_settings var )
```
**readytheme_code**: The ReadyTheme content section code you want to use

**expires**: Expiration Date

**all_settings var**: `l.settings` needs to be passed through

**Example Syntax of Transient_ReadyTheme_ContentSection**
```xml
<mvt:do file="g.Module_Root $ '/modules/util/transients.mvc'" name="l.settings:about_us_section" value="Transient_ReadyTheme_ContentSection( 'about_us', 24*60*60, l.settings )" />
<mvt:if expr="l.settings:about_us_section">
	&mvt:about_us_section;
<mvt:else>
	<mvt:comment> <!-- Failsafe! --> </mvt:comment>
	<mvt:item name="readytheme" param="contentsection( 'about_us' )" />
</mvt:if>
```

**Need a dynamic key for your content section?**

**When this would be useful:** Why not load all your customfield information through a content section, and save the **rendered* HTML instead?

```javascript
Transient_ReadyTheme_ContentSection_LowLevel( key, readytheme_code, expires, all_settings var )
```
**Example Syntax of Transient_ReadyTheme_ContentSection_Lowlevel (v1.007)**
```xml
<mvt:do file="g.Module_Root $ '/modules/util/transients.mvc'" name="l.settings:customlogic" value="Transient_ReadyTheme_ContentSection_Lowlevel( l.settings:product:code $ '__customlogic', 'customlogic', 24*60*60, l.settings )" />
<mvt:if expr="l.settings:customlogic">
	&mvt:customlogic;
<mvt:else>
	<mvt:comment> <!-- Failsafe! --> </mvt:comment>
	<mvt:item name="readytheme" param="contentsection( 'customlogic' )" />
</mvt:if>
```
