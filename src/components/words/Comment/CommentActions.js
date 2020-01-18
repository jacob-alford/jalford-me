import React, { useState } from 'react';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import useTLD from 'components/bindings/hooks/useTLD';

import { themeHook } from 'theme';

const getLightIconColor = isEditing =>
	isEditing ? 'rgba(0,0,0,.5)' : 'rgba(0,0,0,1)';
const getDarkIconColor = isEditing =>
	isEditing ? 'rgba(255,255,255,.5)' : 'rgba(255,255,255,1)';
const getIconColor = (tldState, isEditing) =>
	tldState === 'light'
		? getLightIconColor(isEditing)
		: getDarkIconColor(isEditing);

const useClasses = themeHook({
	edit: {
		color: ({ tldState, isEditing }) => getIconColor(tldState, isEditing)
	}
});

export default function CommentActions(props) {
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [confirmPermDelete, setConfirmPermDelete] = useState(false);
	const [tldState] = useTLD();
	const classes = useClasses({ tldState, ...props });
	const {
		activeUser,
		commentUser,
		edit,
		remove,
		permDelete,
		isEditing
	} = props;
	return (
		<React.Fragment>
			{activeUser.uid === commentUser.uid ? (
				<IconButton onClick={edit} disabled={isEditing}>
					<EditIcon className={classes.edit} />
				</IconButton>
			) : null}
			{activeUser.uid === commentUser.uid ||
			activeUser.permissions.value === 10 ? (
				<IconButton
					onClick={
						confirmDelete
							? () => {
									setConfirmDelete(false);
									remove();
							  }
							: () => setConfirmDelete(true)
					}
					color={confirmDelete ? 'secondary' : 'primary'}>
					<DeleteIcon />
				</IconButton>
			) : null}
			{activeUser.permissions.value === 10 ? (
				<IconButton
					onClick={
						confirmPermDelete
							? () => {
									setConfirmPermDelete(false);
									permDelete();
							  }
							: () => setConfirmPermDelete(true)
					}
					color={confirmPermDelete ? 'secondary' : 'primary'}>
					<DeleteForeverIcon />
				</IconButton>
			) : null}
		</React.Fragment>
	);
}
