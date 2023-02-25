console.clear();

function getWiseSaying() {
    function getData() {
        const arr = wiseSayings.trim().split("\n");

        const data = [];

        arr.forEach((row, index) => {
            const [str, writer] = row.split("//");

            data.push({
                index,
                str,
                writer
            });
        });

        return data;
    }

    function get(index) {
        index = index % data.length;

        return data[index];
    }

    const data = getData();

    return {
        get
    };
}

const wiseSaying = getWiseSaying();

const myConfetti = confetti.create(document.querySelector("#confetti-canvas"), {
    resize: true,
    useWorker: true
});

import { CountUp } from "https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.1.0/countUp.min.js";

const { useState, useRef, useEffect, useMemo } = React;

import { produce } from "https://cdn.skypack.dev/immer";

const {
    RecoilRoot,
    atom,
    atomFamily,
    useRecoilState,
    useSetRecoilState,
    useRecoilValue
} = Recoil;

const {
    HashRouter: Router,
    Routes,
    Route,
    NavLink,
    Navigate,
    useParams,
    useNavigate,
    useLocation
} = ReactRouterDOM;

import classNames from "https://cdn.skypack.dev/classnames";

const {
    colors,
    CssBaseline,
    ThemeProvider,
    createTheme,
    Link,
    Button,
    AppBar,
    Toolbar,
    TextField,
    Chip,
    Box,
    SwipeableDrawer,
    List,
    ListItem,
    Divider,
    Modal,
    Snackbar,
    Alert: MuiAlert
} = MaterialUI;

const Alert = React.forwardRef((props, ref) => {
    return <MuiAlert {...props} ref={ref} variant="filled" />;
});

import { recoilPersist } from "https://cdn.skypack.dev/recoil-persist";

const { persistAtom: persistAtomCommon } = recoilPersist({
    key: "persistAtomCommon"
});

function NoticeSnackbar() {
    const status = useNoticeSnackbarStatus();

    return (
        <>
            <Snackbar
                open={status.opened}
                autoHideDuration={status.autoHideDuration}
                onClose={status.close}
            >
                <Alert severity={status.severity}>{status.msg}</Alert>
            </Snackbar>
        </>
    );
}

const noticeSnackbarInfoAtom = atom({
    key: "app/noticeSnackbarInfoAtom",
    default: {
        opened: false,
        autoHideDuration: 0,
        severity: "",
        msg: ""
    }
});

function useNoticeSnackbarStatus() {
    const [noticeSnackbarInfo, setNoticeSnackbarInfo] = useRecoilState(
        noticeSnackbarInfoAtom
    );

    const opened = noticeSnackbarInfo.opened;
    const autoHideDuration = noticeSnackbarInfo.autoHideDuration;
    const severity = noticeSnackbarInfo.severity;
    const msg = noticeSnackbarInfo.msg;

    const open = (msg, severity = "success", autoHideDuration = 6000) => {
        setNoticeSnackbarInfo({
            opened: true,
            msg,
            severity,
            autoHideDuration
        });
    };

    const close = () => {
        setNoticeSnackbarInfo({
            ...noticeSnackbarInfo,
            opened: false
        });
    };

    return {
        opened,
        open,
        close,
        autoHideDuration,
        severity,
        msg
    };
}

function CountNumber({ start = 0, end = 1000, duration = 2 }) {
    const spanRef = useRef(null);
    const countUpRef = useRef(null);

    useEffect(() => {
        if (countUpRef.current == null) {
            countUpRef.current = new CountUp(spanRef.current, end, {
                startVal: start,
                duration: duration,
                formattingFn: (num) => String(num).padStart(5, "0")
            });
            countUpRef.current.start();
        } else {
            countUpRef.current.update(end);
        }

        return () => {
            // 혹시나 해당 라이브러리를 clean, clear 하는 함수가 있다면 여기서 호출
        };
    }, [end]);

    return <span ref={spanRef} />;
}

function RecordModal({ status }) {
    const noticeSnackbarStatus = useNoticeSnackbarStatus();
    const recordsStatus = useRecordsStatus();

    const [recordCount, setRecordCount] = useState(0);

    const changeRecordCount = (addiCount) => {
        if (addiCount > 0) {
            myConfetti({
                particleCount: addiCount * 10,
                spread: 160
                // any other options from the global
                // confetti function
            });
        }

        const newRecordCount =
            recordCount + addiCount < 0 ? 0 : recordCount + addiCount;
        setRecordCount(newRecordCount);
    };

    const saveRecord = () => {
        if (recordCount == 0) return;

        recordsStatus.saveRecord(recordCount);
        setRecordCount(0);

        status.close();
        noticeSnackbarStatus.open(`이번 세트에 ${recordCount}회 수행하셨습니다.`);
    };

    const cancelRecord = () => {
        setRecordCount(0);

        status.close();
    };

    return (
        <>
            <Modal
                className="flex justify-center items-center"
                open={status.opened}
                onClose={cancelRecord}
            >
                <div className="bg-white rounded-[20px] p-7 w-full max-w-lg">
                    <div className="text-center select-none">이번에 몇회 하셨나요?</div>
                    <div className="text-center">
                        <span className="text-[120px] text-[color:var(--mui-color-primary-main)] font-mono select-none">
                            {String(recordCount).padStart(2, "0")}
                        </span>
                    </div>
                    <div className="flex justify-center gap-2">
                        <Button variant="contained" onClick={() => changeRecordCount(5)}>
                            +5
                        </Button>
                        <Button variant="contained" onClick={() => changeRecordCount(1)}>
                            +1
                        </Button>
                        <Button variant="outlined" onClick={() => changeRecordCount(-5)}>
                            -5
                        </Button>
                        <Button variant="outlined" onClick={() => changeRecordCount(-1)}>
                            -1
                        </Button>
                    </div>

                    <div className="mt-10 flex justify-center gap-2">
                        <Button variant="contained" onClick={saveRecord}>
                            적용
                        </Button>
                        <Button variant="outlined" onClick={cancelRecord}>
                            취소
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

const recordsAtom = atom({
    key: "app/recordsAtom",
    default: [],
    effects_UNSTABLE: [persistAtomCommon]
});

const doneCountAtom = atom({
    key: "app/doneCountAtom",
    default: 0,
    effects_UNSTABLE: [persistAtomCommon]
});

function useRecordsStatus() {
    const goalCount = 10000;
    const [records, setRecords] = useRecoilState(recordsAtom);
    const [doneCount, setDoneCount] = useRecoilState(doneCountAtom);
    const restCount = goalCount - doneCount;

    const saveRecord = (addiDoneCount) => {
        setDoneCount(doneCount + addiDoneCount);
        const newRecord = {
            count: addiDoneCount,
            regDate: dateToStr(new Date())
        };
        const newRecords = [newRecord, ...records];
        setRecords(newRecords);
    };

    const findIndexById = (id) => {
        if (id === null) {
            return -1;
        }

        if (id < 1) {
            return -1;
        }

        if (id > records.length) {
            return -1;
        }

        return records.length - id;
    };

    const removeRecordById = (id) => {
        const index = findIndexById(id);

        if (index == -1) return;

        const record = records[index];

        setRecords(
            produce(records, (draft) => {
                draft.splice(index, 1);
            })
        );

        setDoneCount(doneCount - record.count);
    };

    return {
        restCount,
        saveRecord,
        goalCount,
        records,
        removeRecordById
    };
}

function useRecordModalStatus() {
    const [opened, setOpened] = useState(false);

    const close = () => setOpened(false);
    const open = () => setOpened(true);

    return {
        opened,
        close,
        open
    };
}

function MainPage() {
    const recordsStatus = useRecordsStatus();
    const recordModalStatus = useRecordModalStatus();

    return (
        <>
            <RecordModal status={recordModalStatus} />
            <div className="flex-1 flex items-center justify-center">
                <div>
                    <div className="text-[100px] text-[color:var(--mui-color-primary-main)] font-mono select-none">
                        <CountNumber
                            start={recordsStatus.goalCount}
                            end={recordsStatus.restCount}
                            duration={3}
                        />
                    </div>
                    <div className="flex justify-center">
                        <Button variant="contained" onClick={recordModalStatus.open}>
                            기록
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

function WiseSaying({ index }) {
    const { str, writer } = wiseSaying.get(index);

    return (
        <>
            {str}
            <br />- {writer} -
        </>
    );
}

function RecordListItem({ no, record, optionDrawerStatus }) {
    const wiseSayingIndex = no % 5 == 0 ? no / 5 - 1 : null;

    return (
        <li className="mt-10 px-10">
            <div className="flex gap-2">
                <Chip label={`${no}회차`} variant="outlined" className="!pt-1" />
                <Chip
                    label={record.regDate}
                    variant="outlined"
                    className="!pt-1"
                    color="primary"
                />
            </div>
            <div className="mt-4 shadow rounded-[20px] flex">
                <div className="px-5 hover:text-[color:var(--mui-color-primary-main)] flex-grow flex items-center whitespace-pre-wrap leading-relaxed my-5">
                    {record.count}회 수행
                    {wiseSayingIndex !== null && (
                        <>
                            <br />
                            <br />
                            <WiseSaying index={wiseSayingIndex} />
                        </>
                    )}
                </div>
                <Button
                    onClick={() => optionDrawerStatus.open(no)}
                    className="flex-shrink-0 !items-start !rounded-[0_20px_20px_0]"
                    color="inherit"
                >
                    <span className="text-[#dcdcdc] text-2xl h-[80px] flex items-center">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </span>
                </Button>
            </div>
        </li>
    );
}

function useRecordOptionDrawerStatus() {
    const [recordId, setRecordId] = useState(null);
    const opened = useMemo(() => recordId !== null, [recordId]);
    const close = () => setRecordId(null);
    const open = (id) => setRecordId(id);

    return {
        recordId,
        opened,
        close,
        open
    };
}

function RecordOptionDrawer({ status }) {
    const noticeSnackbarStatus = useNoticeSnackbarStatus();
    const recordsStatus = useRecordsStatus();

    const removeRecord = () => {
        recordsStatus.removeRecordById(status.recordId);

        status.close();
        noticeSnackbarStatus.open(
            `${status.recordId}번 기록이 삭제되었습니다.`,
            "info"
        );
    };

    return (
        <>
            <SwipeableDrawer
                anchor="bottom"
                open={status.opened}
                onClose={status.close}
                onOpen={() => { }}
            >
                <List className="!py-0">
                    <ListItem className="!pt-6 !p-5">
                        <span className="text-[color:var(--mui-color-primary-main)]">
                            {status.recordId}번
                        </span>
                        <span>&nbsp;</span>
                        <span>기록에 대해서</span>
                    </ListItem>
                    <Divider />
                    <ListItem
                        className="!pt-6 !p-5 !items-baseline"
                        button
                        onClick={removeRecord}
                    >
                        <i className="fa-solid fa-trash-can"></i>
                        &nbsp;
                        <span>삭제</span>
                    </ListItem>
                    <ListItem
                        className="!pt-6 !p-5 !items-baseline"
                        button
                        onClick={() => { }}
                    >
                        <i className="fa-solid fa-pen-to-square"></i>
                        &nbsp;
                        <span>수정</span>
                    </ListItem>
                </List>
            </SwipeableDrawer>
        </>
    );
}

function HistoryPage() {
    const recordsStatus = useRecordsStatus();
    const recordOptionDrawerStatus = useRecordOptionDrawerStatus();

    return (
        <>
            <RecordOptionDrawer status={recordOptionDrawerStatus} />
            <div className="flex-1">
                <ul>
                    {recordsStatus.records.map((record, index) => (
                        <RecordListItem
                            key={index}
                            record={record}
                            index={index}
                            no={recordsStatus.records.length - index}
                            optionDrawerStatus={recordOptionDrawerStatus}
                        />
                    ))}
                </ul>
            </div>
        </>
    );
}

function App() {
    const location = useLocation();

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <div className="flex-1"></div>
                    <span className="font-bold select-none">스쿼트 챌린지</span>
                    <div className="flex-1 flex justify-end">
                        {location.pathname != "/history" && (
                            <NavLink className="select-none" to="/history">
                                히스토리
                            </NavLink>
                        )}
                        {location.pathname == "/history" && (
                            <NavLink className="select-none" to="/main">
                                이전
                            </NavLink>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <NoticeSnackbar />
            <Routes>
                <Route path="/main" element={<MainPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="*" element={<Navigate to="/history" />} />
            </Routes>
        </>
    );
}

const muiThemePaletteKeys = [
    "background",
    "common",
    "error",
    "grey",
    "info",
    "primary",
    "secondary",
    "success",
    "text",
    "warning"
];

function Root() {
    // Create a theme instance.
    const theme = createTheme({
        typography: {
            fontFamily: ["GmarketSansMedium"]
        },
        // 앱 테마
        palette: {
            primary: {
                main: "#7FCA93",
                contrastText: "#ffffff"
            }
        }
    });

    useEffect(() => {
        const r = document.querySelector(":root");

        muiThemePaletteKeys.forEach((paletteKey) => {
            const themeColorObj = theme.palette[paletteKey];

            for (const key in themeColorObj) {
                if (Object.hasOwnProperty.call(themeColorObj, key)) {
                    const colorVal = themeColorObj[key];
                    r.style.setProperty(`--mui-color-${paletteKey}-${key}`, colorVal);
                }
            }
        });
    }, []);

    return (
        <RecoilRoot>
            <Router>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </Router>
        </RecoilRoot>
    );
}

ReactDOM.render(<Root />, document.getElementById("root"));

// 유틸리티

// 날짜 객체 입력받아서 문장(yyyy-mm-dd hh:mm:ss)으로 반환한다.
function dateToStr(d) {
    const pad = (n) => {
        return n < 10 ? "0" + n : n;
    };

    return (
        d.getFullYear() +
        "-" +
        pad(d.getMonth() + 1) +
        "-" +
        pad(d.getDate()) +
        " " +
        pad(d.getHours()) +
        ":" +
        pad(d.getMinutes()) +
        ":" +
        pad(d.getSeconds())
    );
}
