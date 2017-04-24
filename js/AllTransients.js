function AllTransients_Batchlist() {
	MMBatchList.call( this, 'AllTransients' );
	this.Feature_SearchBar_SetPlaceholderText( 'Search Transients...' );
	this.SetDefaultSort( 'tkey', '' );
	this.Feature_Delete_Enable('Delete Transient(s)');
	this.Feature_Buttons_AddButton_Persistent( 'Delete All', 'Delete All', 'delete', this.deleteAll );
	this.Feature_Buttons_AddButton_Persistent( 'Delete Expired', 'Delete Expired', 'delete', this.deleteExpired );
}

DeriveFrom( MMBatchList, AllTransients_Batchlist );

AllTransients_Batchlist.prototype.onLoad = AllTransients_List_Load_Query;

AllTransients_Batchlist.prototype.onCreateRootColumnList = function() {
	var columnlist =
	[
		new MMBatchList_Column_Name( 'Key', 'tkey', 'tkey'),
		new MMBatchList_Column_TextArea( 'Value', 'Value', 'tvalue', 'tvalue' ),
		new MMBatchList_Column_Name( 'Expires', 'expires', 'expires'),
		new MMBatchList_Column_Name( 'Formatted Expires', 'f_expires', 'f_expires')
		.SetAdvancedSearchEnabled(false)
	];
	return columnlist;
}

// On Delete
AllTransients_Batchlist.prototype.onDelete = function( item, callback, delegator ) {
	AllTransients_Batchlist_Delete( item.record.tkey, callback, delegator );
}

AllTransients_Batchlist.prototype.deleteAll = function(){
	var self = this;
	AllTransients_Batchlist_Delete_All( function( response ) { self.Refresh(); } );
}

AllTransients_Batchlist.prototype.deleteExpired = function(){
	var self = this;
	AllTransients_Batchlist_Delete_Expired( function( response ) { self.Refresh(); } );
}