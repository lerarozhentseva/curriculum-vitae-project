import {
  Box,
  capitalize,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup
} from '@mui/material';
import { InputSelectField } from '@components/Input';
import { ICvMasterySectionProps } from '.';

const CvMasterySection = ({
  chosen,
  options,
  onChoiceChange,
  onMasteryChange,
  masteryMap,
  selectLabel,
  selectName,
  masteryLevels
}: ICvMasterySectionProps) => {
  return (
    <>
      <InputSelectField
        label={selectLabel}
        multiple
        data={options}
        name={selectName}
        onChange={onChoiceChange}
        value={chosen}
      />
      <Paper sx={{ padding: '10px' }}>
        {chosen.map((item) => (
          <Box sx={{ display: 'inline-block', padding: '5px 10px' }} key={item}>
            <FormControl>
              <FormLabel>{item} Mastery</FormLabel>
              <RadioGroup value={masteryMap[item]} onChange={(e) => onMasteryChange(e, item)}>
                {masteryLevels.map((mastery) => (
                  <FormControlLabel
                    key={mastery}
                    control={<Radio />}
                    value={mastery}
                    label={capitalize(mastery)}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        ))}
      </Paper>
    </>
  );
};

export default CvMasterySection;
