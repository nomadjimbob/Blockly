# Blockly

A few helper functions for Google Blockly that I have used for various projects over time. Could probably be tidied up, maybe after I do the dishes.

At the moment it allows you to dynamically change the toolbox by assigning a mode to each category/block and calling BlocklyHelper_ToolboxMode to only show those categories/blocks (and unsigned categories/blocks). I used this to show a simple and advanced view in a project.

Also supports singleton blocks in a workspace by adding the attribute singleton="true". This will disable the block in the toolbox if it is present in the workspace.

Before using the functions, you need to initalize the code with the BlocklyHelper_init function.
