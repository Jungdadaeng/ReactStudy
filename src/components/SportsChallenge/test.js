console.clear();

const myConfetti = confetti.create(document.querySelector("#confetti-canvas"), {
    resize: true,
    useWorker: true
});

import { CountUp } from "https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.1.0/countUp.min.js";

const { useState, useRef, useEffect, useMemo } = React;

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

const doneCountAtom = atom({
    key: "app/doneCountAtom",
    default: 0
});

function useRecordsStatus() {
    const goalCount = 10000;
    const [doneCount, setDoneCount] = useRecoilState(doneCountAtom);
    const restCount = goalCount - doneCount;

    const saveRecord = (addiDoneCount) => {
        setDoneCount(doneCount + addiDoneCount);
    };

    return {
        restCount,
        saveRecord,
        goalCount
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
                    <div className="text-[100px] text-[color:var(--mui-color-primary-main)] font-mono">
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

function HistoryPage() {
    return (
        <>
            <div className="flex-1 flex items-center justify-center">
                <div>히스토리 페이지</div>
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
                <Route path="*" element={<Navigate to="/main" />} />
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
