# Table: rhh_AdminEnvioPagoElectronico

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| cod_cia | char | NO |
| cod_emp | char | NO |
| fecha | datetime | NO |
| NumEnvio | varchar | YES |
| TipoComprobante | tinyint | NO |
| NumLote_operador | uniqueidentifier | YES |
| usuario | nvarchar | YES |
| est_dian | bit | NO |
| FechaEmision | date | YES |
| isSuccess | bit | YES |
| Ldf | varchar | YES |
| guid_envio | uniqueidentifier | YES |
| UrlDoc | varchar | YES |
| UrlPdf | varchar | YES |
| UrlXml | varchar | YES |
| cod_cune | varchar | YES |
| error | varchar | YES |
| FechaProceso | datetime | YES |
| cod_operadorPE | tinyint | NO |
| cune_Reemplazo | varchar | YES |
| NumEnvio_Reemplazo | varchar | YES |
| ind_anulado | bit | NO |
| IndHab | bit | NO |
| Consecutivo_ID | bigint | YES |
| Consecutivo | bigint | NO |
