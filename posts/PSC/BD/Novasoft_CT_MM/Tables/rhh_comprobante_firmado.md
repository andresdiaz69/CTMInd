# Table: rhh_comprobante_firmado

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| id | bigint | NO |
| loteFirma | bigint | NO |
| num_lote | bigint | NO |
| cod_emp | char | NO |
| num_ide | varchar | NO |
| nombreEmpleado | varchar | YES |
| pdfFirmado | varbinary | YES |
| nombrePdf | varchar | YES |
| fechaFirma | datetime | YES |
| usuario | nvarchar | NO |
| estado | bit | NO |
| error | varchar | YES |
| cod_rep | varchar | NO |
