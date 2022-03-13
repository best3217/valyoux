import { IgrFinancialChart, IgrFinancialChartModule } from 'igniteui-react-charts';
import StockIndexData from './StockIndexData';
import { 
    Card
} from '@mui/material';

IgrFinancialChartModule.register();

export default function StockChart() {
    return (
        <Card sx={{ height: '400px', p:3, mt:4 }}>
            <IgrFinancialChart
                width="100%"
                height="100%"
                isToolbarVisible={false}
                chartType="Candle"
                chartTitle="S&P 500"
                titleAlignment="Left"
                titleLeftMargin="25"
                titleTopMargin="10"
                titleBottomMargin="10"
                subtitle="CME - CME Delayed Price, Currency in USD"
                subtitleAlignment="Left"
                subtitleLeftMargin="25"
                subtitleTopMargin="5"
                subtitleBottomMargin="10"
                yAxisLabelLocation="OutsideLeft"
                yAxisMode="Numeric"
                yAxisTitle="Financial Prices"
                yAxisTitleLeftMargin="10"
                yAxisTitleRightMargin="5"
                yAxisLabelLeftMargin="0"
                zoomSliderType="None"
                dataSource={StockIndexData}
            />
        </Card>
    )
}