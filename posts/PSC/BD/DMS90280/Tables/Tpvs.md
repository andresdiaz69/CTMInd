# Table: Tpvs

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkTpvs_Iden | smallint | NO |
| Descripcion | nvarchar | NO |
| FkCtaBancarias | smallint | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| PermiteTarjetasInternas | bit | NO |
| PermiteTarjetasPagoAplazado | bit | NO |
| FkContCtas_Aplazado | nvarchar | YES |
| FkTerceros_Aplazado | int | YES |
| NombreTerceroAplazado | nvarchar | YES |
| FkContCtas_TarjetaTransitoria | nvarchar | YES |
| PermiteTarjetasTransitorias | bit | NO |
| FkPasarelaPagoTipos | nvarchar | YES |
| FkContCtas_TarjetasApunteIntermedio | nvarchar | YES |
| Codigo | nvarchar | YES |
| FkContCtas_TarjetasTP | nvarchar | YES |
| FkTerceros_TarjetaPasarela | int | YES |
