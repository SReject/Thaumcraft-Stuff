#[Centivis Calculator](http://sreject.github.io/Thaumcraft-Stuff/)
Example usage of AspectList.js and aspect.js to calculate the centivis output of a node
&nbsp;  
&nbsp;  
&nbsp;  
&nbsp;  

#`aspects.js`
Default aspect registering for thaumcraft 4.2.2 and addons(addons are registered but not enabled)  
Generated AspectList exported if node-esq environment, otherwise its stored under thaumcraft.aspects
&nbsp;  
&nbsp;  
&nbsp;  
&nbsp;  

#`AspectList.js`
Various utilities for managing thaumcraft Aspect Lists, component aspects, etc.  
Stored as the main module export for node-esq environments, otherwise, stored under thaumcraft in the global scope
&nbsp;  
&nbsp;  
&nbsp;  
&nbsp;  

####`AspectList(@baseAspects, @compile)`
Returns a new AspectList object
> `@baseAspect` - (`object`) - required  
> an object containing aspect names as keys and either an array of component aspects or `false` for primals
>  
> `@compile` - (`boolean`) - optional  
> if `false` the aspect list will not be compiled; defaults to `true`

&nbsp;  
&nbsp;  
&nbsp;  
&nbsp;  

####`AspectList.compile()` - *self*
Recompiles the aspect list
&nbsp;  
&nbsp;  
&nbsp;  
&nbsp;  

####`AspectList.addonAdd(@name, @aspects, @options)` - *self*
Adds the addon's aspects to the aspect pool

> `@name` - (`string`) - required  
> Name of the addon
>
> `@aspects` - (`object`) - required  
> an object containing aspect names as keys and either an array of component aspects or `false` for primals
>
> `@options` - (`object`) - optional  
> Addon options
>
> > `@options.enable` - (`boolean`) - optional  
> > if `true` when the aspect list is recompiled the addon's aspects will be included; defaults to `true`
> >
> > `@options.compile` - (`boolean`) - optional  
> > if not `false` the aspect list will be recompiled if the addon is enabled; defaults to `true`  

&nbsp;  
&nbsp;  
&nbsp;  
&nbsp;  

####`AspectList.addonEnable(@name, @compile)` - *self*
Enables the specified addon for recompilation

> `@name` - (`string`) - required  
> Name of previously added addon
>
> `@compile` - (`boolean`) - optional  
> if not `false` the aspect list will be recompiled if the addon was not already enabled; defaults to `true`  

&nbsp;  
&nbsp;  
&nbsp;  
&nbsp;  

####`AspectList.addonDisable(@name, @compile)` - *self*
Disables the specified addon for recompilation

> `@name` - (`string`) - required  
> name of previously added addon  
>  
> `@compile` - (`boolean`) - optional  
> if not `false` the aspect list will be recompiled if the addon was not already disabled; defaults to `true`  

&nbsp;  
&nbsp;  
&nbsp;  
&nbsp;  
 
####`AspectList.has(@aspect)` - *boolean*
Returns `true` or `false` if the specified aspect is in the compiled aspect list
> `@aspect` - (`string`) - required  
> Aspect to check

&nbsp;  
&nbsp;  
&nbsp;  
&nbsp;  

####`AspectList.components(@aspect)` - *boolean* or *array*
Returns the components of the specified aspect or `false` if primal aspect
> `@aspect` - (`string`) - required  
> Aspect to check

&nbsp;  
&nbsp;  
&nbsp;  
&nbsp;  

####`AspectList.breakdown(@aspect)` - *object*
Returns an object containing the primals(keys) that make up the specified aspect and the amount of each(value)
> `@aspect` - (`string`) - required  
> Aspect to break down

&nbsp;  
&nbsp;  
&nbsp;  
&nbsp;  

####`AspectList.nodeToCentivis(@node, @modifier)` - *object*
Returns an object containing the centivis value of each aspect the node would produce if it is energized
> `@node` - (`object`) - required  
> An object containing each aspect the node has as keys and the amount of vis as the values
>
> `@modifier` - (`string` or `number`) - optional  
> The modifer can be `fading`, `pale`, `bright`, `normal`, `-1`, `0`, or `1`
