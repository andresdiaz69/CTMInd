# Table: GTH_Decisiones_Proc_vinculados

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| Cod_Proc | int | NO |
| Cod_emp | char | NO |
| FechaDecision | datetime | NO |
| Decision | tinyint | NO |
| TipoFalta | varchar | NO |
| NivelFalta | varchar | NO |
| DiasSancion | tinyint | NO |
| ValorSancion | money | NO |
| Observaciones | varchar | NO |
| Compromiso | varchar | NO |
| FechaRetiro | datetime | YES |
| MotivoRetiro | varchar | NO |
| Justificacion | varchar | NO |
| cod_mot | int | YES |
| jus_ret | char | YES |
| ind_envio | bit | YES |
| FecIniSan | datetime | YES |
| Registro | int | NO |
