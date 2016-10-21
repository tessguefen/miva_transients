function AllTransients_List_Load_Query( filter, sort, offset, count, callback, delegator ) {
	return AJAX_Call_Module( callback,
							'admin',
							'tg_transients',
							'AllTransients_Load_Query',
							'&Filter=' + EncodeArray( filter ) +
							'&Sort=' + encodeURIComponent( sort ) +
							'&Offset=' + encodeURIComponent( offset ) +
							'&Count=' + encodeURIComponent( count ),
							delegator );
}

// On Delete
function AllTransients_Batchlist_Delete( tkey, callback, delegator ) {
	return AJAX_Call_Module( callback,
							'admin',
							'tg_transients',
							'Delete_Transient',
							'Transient_Key=' + encodeURIComponent( tkey ),
							delegator );
}
