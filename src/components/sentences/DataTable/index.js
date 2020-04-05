import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';

const styles = {
	header: {
		cursor: 'pointer',
		fontWeight: 'bold'
	}
};

export default function DataTable(props) {
	const { headerConfig, defaultSort, data, selectedFields } = props;
	const [currentSort, setCurrentSort] = useState({
		ref: defaultSort,
		dir: 'a',
		deepAccessor: null
	});
	/* TODO: Figure out why the heck the initial sort doesn't persist */
	useEffect(() => {
		if (currentSort && data && data[0]) {
			const ascending = currentSort.dir === 'a';
			if (currentSort.deepAccessor) {
				const access = currentSort.deepAccessor;
				if (typeof access(data[0][currentSort.ref]) === 'string') {
					data.sort((datum1, datum2) => {
						const comp1 = access(datum1[currentSort.ref]).toUpperCase();
						const comp2 = access(datum2[currentSort.ref]).toUpperCase();
						if (comp1 < comp2) return ascending ? -1 : 1;
						else if (comp1 > comp2) return ascending ? 1 : -1;
						else return 0;
					});
				} else if (typeof access(data[0][currentSort.ref]) === 'number') {
					data.sort(
						(datum1, datum2) =>
							(ascending ? 1 : -1) *
							(access(datum1[currentSort.ref]) - access(datum2[currentSort.ref]))
					);
				} else if (typeof access(data[0][currentSort.ref]) === 'boolean') {
					data.sort((datum1, datum2) => {
						if (access(datum1[currentSort.ref]) < access(datum2[currentSort.ref]))
							return ascending ? -1 : 1;
						else if (access(datum1[currentSort.ref]) > access(datum2[currentSort.ref]))
							return ascending ? 1 : -1;
						else return 0;
					});
				} else if (currentSort.ref.toLowerCase().includes('date')) {
					data.sort((datum1, datum2) => {
						return (
							(ascending ? 1 : -1) *
							(access(datum1[currentSort.ref]).seconds - access(datum2[currentSort.ref]).seconds)
						);
					});
				}
			} else {
				if (typeof data[0][currentSort.ref] === 'string') {
					data.sort((datum1, datum2) => {
						const comp1 = datum1[currentSort.ref].toUpperCase();
						const comp2 = datum2[currentSort.ref].toUpperCase();
						if (comp1 < comp2) return ascending ? -1 : 1;
						else if (comp1 > comp2) return ascending ? 1 : -1;
						else return 0;
					});
				} else if (typeof data[0][currentSort.ref] === 'number') {
					data.sort(
						(datum1, datum2) =>
							(ascending ? 1 : -1) * (datum1[currentSort.ref] - datum2[currentSort.ref])
					);
				} else if (typeof data[0][currentSort.ref] === 'boolean') {
					data.sort((datum1, datum2) => {
						if (datum1[currentSort.ref] < datum2[currentSort.ref]) return ascending ? -1 : 1;
						else if (datum1[currentSort.ref] > datum2[currentSort.ref])
							return ascending ? 1 : -1;
						else return 0;
					});
				} else if (currentSort.ref.toLowerCase().includes('date')) {
					data.sort((datum1, datum2) => {
						return (
							(ascending ? 1 : -1) *
							(datum1[currentSort.ref].seconds - datum2[currentSort.ref].seconds)
						);
					});
				}
			}
		}
	}, [currentSort, data]);
	const createSortBy = (ref, deepAccessor) => {
		return () => {
			if (currentSort.ref === ref) {
				const dir = currentSort.dir === 'a' ? 'd' : 'a';
				if (deepAccessor) {
					setCurrentSort({
						...currentSort,
						dir: dir,
						deepAccessor: deepAccessor
					});
				} else {
					setCurrentSort({ ...currentSort, dir: dir, deepAccessor: null });
				}
			} else {
				if (deepAccessor) {
					setCurrentSort({
						...currentSort,
						ref: ref,
						deepAccessor: deepAccessor
					});
				} else {
					setCurrentSort({ ...currentSort, ref: ref, deepAccessor: null });
				}
			}
		};
	};
	return (
		<Table>
			<TableHead>
				<TableRow>
					{headerConfig
						.filter(header => selectedFields.includes(header.label))
						.map((header, headerIndex) => (
							<TableCell style={{ textAlign: 'center' }} key={`header${headerIndex}`}>
								<Grid container direction='row' justify='center' alignItems='center'>
									{currentSort && header.sortable ? (
										<Grid item>
											<Typography
												variant='h6'
												component='span'
												style={styles.header}
												onClick={createSortBy(header.ref[0], header.deepAccessor)}>
												{header.label}
											</Typography>
										</Grid>
									) : (
										<Grid item>
											<Typography
												variant='h6'
												component='span'
												style={{ ...styles.header, cursor: 'default' }}>
												{header.label}
											</Typography>
										</Grid>
									)}
									{currentSort && header.sortable && currentSort.ref === header.ref[0] ? (
										<Grid item>
											<IconButton onClick={createSortBy(header.ref[0], header.deepAccessor)}>
												{currentSort.dir === 'a' ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
											</IconButton>
										</Grid>
									) : null}
									{currentSort && header.sortable && currentSort.ref !== header.ref[0] ? (
										<Grid item>
											<IconButton onClick={createSortBy(header.ref[0], header.deepAccessor)}>
												{currentSort.dir === 'a' ? (
													<KeyboardArrowUp style={{ color: 'rgba(0,0,0,.25)' }} />
												) : (
													<KeyboardArrowDown style={{ color: 'rgba(0,0,0,.25)' }} />
												)}
											</IconButton>
										</Grid>
									) : null}
								</Grid>
							</TableCell>
						))}
				</TableRow>
			</TableHead>
			<TableBody>
				{data.map((post, postIndex) => (
					<TableRow key={`postRow${postIndex}`}>
						{headerConfig
							.filter(header => selectedFields.includes(header.label))
							.map((header, dataIndex) => {
								if (header.transform)
									return (
										<TableCell style={{ textAlign: 'center' }} key={`dataEntry${dataIndex}`}>
											{header.transform(...header.ref.map(ref => post[ref]))}
										</TableCell>
									);
								else
									return (
										<TableCell style={{ textAlign: 'center' }} key={`dataEntry${dataIndex}`}>
											{post[header.ref[0]]}
										</TableCell>
									);
							})}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
