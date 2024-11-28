# Table: spiga_ReferenciasDerivadasDelPetroleo

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| CodigoEmpresa | smallint | YES |
| NombreEmpresa | nvarchar | YES |
| CodigoCentro | smallint | YES |
| NombreCentro | nvarchar | YES |
| MarcaReferencia | nvarchar | YES |
| Referencia | nvarchar | YES |
| DescripcionReferencia | nvarchar | YES |
| Referencialimpia | nvarchar | YES |
| FkpartidaArancelaria | nvarchar | YES |
| FkImpuestos | nvarchar | YES |
| PkFkImpuestoTipos | nvarchar | YES |
| PkImpuestos | nvarchar | YES |
| PermiteGarantia | bit | YES |
| Habilitado | bit | YES |
| Fechaalta | datetime | YES |
| FkFabricantes | smallint | YES |
| descripcion | nvarchar | YES |
