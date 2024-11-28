# Table: TarifasMarcasCanje

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkMR | nvarchar | NO |
| PkFkTarifas | tinyint | NO |
| PkTarifasMarcasCanje_Iden | smallint | NO |
| ConfiguracionTipos | tinyint | NO |
| FkTerceros | int | YES |
| Sobretasa | bit | NO |
| FacturaDevolucion | bit | NO |
| FacturaPenalizacion | bit | NO |
| DiasPlazoDevolucion | smallint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| SignoSobretasa | nvarchar | YES |
