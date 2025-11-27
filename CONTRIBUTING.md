# Contributing to File Converter Pro

## Adding New Conversion Types

1. **Create conversion function** in `src/main/conversions/`:
   ```typescript
   // src/main/conversions/new-format.ts
   import { ConversionResult } from '../types';
   
   export async function convertNewFormat(
     inputPath: string,
     outputPath: string
   ): Promise<ConversionResult> {
     try {
       // Your conversion logic here
       return { success: true, outputPath };
     } catch (error) {
       return { 
         success: false, 
         error: error instanceof Error ? error.message : 'Conversion failed' 
       };
     }
   }
   ```

2. **Add to conversion types** in `src/main/types.ts`:
   ```typescript
   export type ConversionType =
     | 'pdf-to-docx'
     | 'your-new-type'  // Add here
     | ...
   ```

3. **Register in index** (`src/main/conversions/index.ts`):
   ```typescript
   import { convertNewFormat } from './new-format';
   
   export async function convertFile(job: ConversionJob): Promise<ConversionResult> {
     switch (job.conversionType) {
       case 'your-new-type':
         return await convertNewFormat(job.inputPath, job.outputPath);
       // ...
     }
   }
   ```

4. **Add UI tool** in `src/renderer/data/tools.ts`:
   ```typescript
   {
     id: 'your-new-type',
     name: 'Format A → Format B',
     description: 'Convert Format A to Format B',
     icon: '📄',
     conversionType: 'your-new-type',
     inputExtensions: ['.ext1'],
     outputExtension: '.ext2',
     category: 'pdf',
   }
   ```

## Code Style

- Use TypeScript strict mode
- Follow existing patterns for error handling
- Add JSDoc comments for public functions
- Use async/await for asynchronous operations
- Validate inputs before processing

## Testing Conversions

1. Create test files in various formats
2. Test single file conversions
3. Test batch conversions
4. Test error cases (missing files, invalid formats)
5. Verify output files open correctly

## Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit PR with clear description
