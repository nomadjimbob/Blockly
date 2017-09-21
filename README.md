# Blockly

A few helper functions for Google Blockly that I have used for various projects over time. Could probably be tidied up, maybe after I do the dishes.

At the moment it allows you to dynamically change the toolbox by assigning a mode to each category/block and calling BlocklyHelper_ToolboxMode to only show those categories/blocks (and unsigned categories/blocks). I used this to show a simple and advanced view in a project.

Also supports singleton blocks in a workspace by adding the attribute singleton="true". This will disable the block in the toolbox if it is present in the workspace.

Before using the functions, you need to initalize the code with the BlocklyHelper_init function.

## Functions

__BlocklyHelper_init(workspace, toolboxId, mode)__

_Initalizes the library, adds the listener callback and sets the toolbox_


A XML toolbox with a category is required to be passed with the Blockly inject call. This can simply be a string such as <xml><category name="loading"></category></xml>

workspace - Blockly workspace
toolboxId - ID of DOM element containing the toolbox XML
mode - If not blank, sets the Blockly toolbox to only show category/blocks set to mode (or with no mode set)


__BlocklyHelper_ToolboxMode(workspace, mode)__
_Sets the Blockly toolbox to only show categories/blocks set to mode (or with no mode set)_

workspace - Blockly workspace
mode - Only show categories/blocks that contain this mode attribute (or with no mode attribute set)


__BlocklyHelper_DisableBlock(workspace, type, disable)__
_Disables/Enables a block type in the toolbox_

workspace - Blockly workspace
type - Block type to change
disable - Boolean to disable/enable
