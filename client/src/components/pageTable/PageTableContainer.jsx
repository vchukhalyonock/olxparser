import React,
{
    Component,
    Fragment
} from "react";
import Confirm from "../confirm";
import Title from "../title";
import {
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow
} from "@material-ui/core";
import SortingHeader from "../sortingHeader";
import {
    array,
    bool,
    func,
    number,
    string
} from "prop-types";


class PageTableContainer extends Component {
    render() {
        const {
            openConfirm,
            confirmMessage,
            agreeHandler,
            disagreeHandler,
            tableTitle,
            headCells,
            orderBy,
            order,
            sortHandler,
            itemsPerPage,
            currentPage,
            handleChangePage,
            handleChangeRowsPerPage,
            total,
            children,
            isTotalCheckbox,
            currentPageSelectedNums,
            allCheckboxSelectedHandler,
            allIds
        } = this.props;

        return (
            <Fragment>
                <Confirm
                    message={confirmMessage}
                    title="Please, confirm"
                    isOpen={openConfirm}
                    agreeHandler={agreeHandler}
                    disagreeHandler={disagreeHandler}
                />
                <Title>{tableTitle}</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {isTotalCheckbox && (
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        indeterminate={currentPageSelectedNums > 0 && currentPageSelectedNums < itemsPerPage && currentPageSelectedNums < total}
                                        checked={total > 0 && (currentPageSelectedNums === itemsPerPage || currentPageSelectedNums === total)}
                                        onChange={() => allCheckboxSelectedHandler(allIds, currentPageSelectedNums)}
                                    />
                                </TableCell>
                            )}
                            <SortingHeader
                                headCells={headCells}
                                orderBy={orderBy}
                                order={order}
                                sortHandler={sortHandler}
                            />
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {children}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={5}
                                count={total}
                                rowsPerPage={itemsPerPage}
                                page={currentPage}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </Fragment>
        )
    }
}

PageTableContainer.propTypes = {
    openConfirm: bool.isRequired,
    confirmMessage: string.isRequired,
    agreeHandler: func.isRequired,
    disagreeHandler: func.isRequired,
    tableTitle: string.isRequired,
    headCells: array.isRequired,
    orderBy: string.isRequired,
    order: string.isRequired,
    sortHandler: func.isRequired,
    itemsPerPage: number.isRequired,
    currentPage: number.isRequired,
    handleChangePage: func.isRequired,
    handleChangeRowsPerPage: func.isRequired,
    total: number.isRequired,
    isTotalCheckbox: bool,
    currentPageSelectedNums: number,
    allCheckboxSelectedHandler: func,
    allIds: array
};

PageTableContainer.defaultProps = {
    isTotalCheckbox: false,
    currentPageSelectedNums: 0,
    allCheckboxSelectedHandler: undefined,
    allIds: []
};

export default PageTableContainer;
