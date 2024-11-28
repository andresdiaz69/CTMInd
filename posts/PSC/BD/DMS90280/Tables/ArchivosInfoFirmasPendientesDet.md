# Table: ArchivosInfoFirmasPendientesDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkArchivos | int | NO |
| PkArchivosInfoFirmasPendientesDet_Iden | smallint | NO |
| Nombre | nvarchar | YES |
| Descripcion | nvarchar | YES |
| Razon | nvarchar | YES |
| Localizacion | nvarchar | YES |
| Firmante | nvarchar | YES |
| FkTerceros_Firmante | int | YES |
| TratamientoFirmante | nvarchar | YES |
| EmailNotificacion | nvarchar | YES |
| SmsNotificacion | nvarchar | YES |
| EsCliente | bit | YES |
| Prioridad | tinyint | YES |
| Calidad | tinyint | YES |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| FkSecciones | int | YES |
| FkEmpleados | smallint | YES |
| IdFirmas | nvarchar | YES |
| FirmaKey | nvarchar | YES |
| FirmaGlobalKey | nvarchar | YES |
| SecretKeyOTP | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkBiofirmaTipos | nvarchar | YES |
| IPFirmante | nvarchar | YES |
| DispositivoFirmante | nvarchar | YES |
| ContenidoInfoOTP | nvarchar | YES |
| FechaEnvioOTP | datetime | YES |
| FechaValidacionOTP | datetime | YES |
| FechaFirmaOTP | datetime | YES |
| FechaFirmaRubrica | datetime | YES |
