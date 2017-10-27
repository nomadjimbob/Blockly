function getTopBlockCodeWithVars(workspace, blockType) {
	blocks = workspace.getTopBlocks(true);
	Blockly.JavaScript.init(workspace);

	code = '';
	vars = '';
	
	for(b = 0; b < blocks.length; b++) {
		blockCode = Blockly.JavaScript.blockToCode(blocks[b]);
		
		if(blocks[b].type == blockType) {
			code = blockCode;
		}
	}
	
	for(def in Blockly.JavaScript.definitions_) {
		vars += Blockly.JavaScript.definitions_[def] + "\n";
	}

	return code;
}
