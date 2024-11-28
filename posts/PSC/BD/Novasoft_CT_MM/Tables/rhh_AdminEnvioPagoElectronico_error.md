# Table: rhh_AdminEnvioPagoElectronico_error

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| cod_cia | char | NO |
| cod_emp | char | NO |
| fecha | datetime | NO |
| Consecutivo | bigint | NO |
| FechaProceso | datetime | NO |
| NumEnvio | varchar | YES |
| error | varchar | YES |
| TipoComprobante | tinyint | NO |
| cod_operadorPE | tinyint | NO |
| NumLote_operador | uniqueidentifier | YES |
